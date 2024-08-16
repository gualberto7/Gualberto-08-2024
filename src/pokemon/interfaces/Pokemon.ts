export interface Pokemon {
  name: string
  url: string
  types?: PokemonType[]
  stats?: PokemonStat[]
  cries?: PokemonCry
}

interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface PokemonCry {
  latest: string
  legacy: string
}
