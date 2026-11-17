import { PLAY_SCENARIOS } from '@ord/shared';
import { error } from '@sveltejs/kit';
import { getSanityClient } from '$lib/server/sanity';

interface PlaySummary {
  title: string,
  slug: string,
  scenario: string,
  configuration: string,
  diagram: object,
}

interface Scenario {
  slug: string,
  name: string,
  plays: PlaySummary[],
}

interface Play {
  title: string,
  scenario: string,
  configuration: string,
  diagram: object,
  aspect_ratio: number,
  animation_url: string | null,
  notes: [] | null,
  drills: { title: string, description: [] | null }[] | null,

  // Computed fields:
  scenario_name: string,
}

/**
 * @returns All scenarios that have plays, ordered by the scenarios list. Plays within scenarios
 * are ordered manually in Sanity.
 */
export async function loadPlaysByScenario(): Promise<Scenario[]> {
  const plays: PlaySummary[] = await getSanityClient().fetch(
      `*[_type == "play" && defined(slug.current) && defined(scenario)] | order(orderRank asc) {
        title,
        "slug": slug.current,
        scenario,
        configuration,
        diagram,
      }`
  );

  const playsByScenario = Map.groupBy(plays, play => play.scenario);
  const unknownScenarios = [...playsByScenario.keys()]
      .filter(slug => !PLAY_SCENARIOS.some(scenario => scenario.slug == slug))
      .map(slug => ({ slug, name: slug }));

  return [...PLAY_SCENARIOS, ...unknownScenarios]
      .filter(scenario => playsByScenario.has(scenario.slug))
      .map(
          scenario => ({
            slug: scenario.slug,
            name: scenario.name,
            plays: playsByScenario.get(scenario.slug)!,
          })
      );
}

/**
 * @param slug Slug for the play being loaded, e.g. '2-2-squeeze'
 * @returns The play with the specified slug
 */
export async function loadPlay(slug: string): Promise<Play> {
  const play: Play | null = await getSanityClient().fetch(
      `*[_type == "play" && slug.current == $slug][0] {
        title,
        scenario,
        configuration,
        diagram,
        "aspect_ratio": diagram.asset->metadata.dimensions.aspectRatio,
        "animation_url": animation.asset->url,
        notes,
        drills[] {
          title,
          description,
        },
      }`,
      { slug },
  );

  if (!play) {
    error(404, 'Requested play not found.');
  }

  play.scenario_name = PLAY_SCENARIOS.find(scenario => scenario.slug == play.scenario)?.name ?? play.scenario;
  return play;
}
