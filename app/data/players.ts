export interface Player {
  name: string;
  country: string;
  club: string;
  league: string;
  position: string;
  age: number;
  height_cm: number;
}

export const players: Player[] = [
    { "name": "Kylian Mbappé", "country": "France", "club": "Real Madrid", "league": "La Liga", "position": "FW", "age": 27, "height_cm": 178 },
    { "name": "Erling Haaland", "country": "Norway", "club": "Manchester City", "league": "Premier League", "position": "ST", "age": 25, "height_cm": 194 },
    { "name": "Vinicius Jr", "country": "Brazil", "club": "Real Madrid", "league": "La Liga", "position": "LW", "age": 26, "height_cm": 176 },
    { "name": "Jude Bellingham", "country": "England", "club": "Real Madrid", "league": "La Liga", "position": "CM", "age": 23, "height_cm": 186 },
    { "name": "Bukayo Saka", "country": "England", "club": "Arsenal", "league": "Premier League", "position": "RW", "age": 24, "height_cm": 178 },
    { "name": "Pedri", "country": "Spain", "club": "Barcelona", "league": "La Liga", "position": "CM", "age": 23, "height_cm": 174 },
    { "name": "Gavi", "country": "Spain", "club": "Barcelona", "league": "La Liga", "position": "CM", "age": 22, "height_cm": 173 },
    { "name": "Florian Wirtz", "country": "Germany", "club": "Bayer Leverkusen", "league": "Bundesliga", "position": "CAM", "age": 23, "height_cm": 177 },
    { "name": "Jamal Musiala", "country": "Germany", "club": "Bayern Munich", "league": "Bundesliga", "position": "CAM", "age": 23, "height_cm": 180 },
    { "name": "Lautaro Martinez", "country": "Argentina", "club": "Inter", "league": "Serie A", "position": "ST", "age": 28, "height_cm": 174 },

    { "name": "Rodrygo", "country": "Brazil", "club": "Real Madrid", "league": "La Liga", "position": "RW", "age": 25, "height_cm": 174 },
    { "name": "Endrick", "country": "Brazil", "club": "Real Madrid", "league": "La Liga", "position": "ST", "age": 20, "height_cm": 173 },
    { "name": "Federico Valverde", "country": "Uruguay", "club": "Real Madrid", "league": "La Liga", "position": "CM", "age": 27, "height_cm": 182 },
    { "name": "Darwin Nunez", "country": "Uruguay", "club": "Liverpool", "league": "Premier League", "position": "ST", "age": 27, "height_cm": 187 },
    { "name": "Enzo Fernandez", "country": "Argentina", "club": "Chelsea", "league": "Premier League", "position": "CM", "age": 25, "height_cm": 178 },
    { "name": "Alexis Mac Allister", "country": "Argentina", "club": "Liverpool", "league": "Premier League", "position": "CM", "age": 27, "height_cm": 176 },
    { "name": "Alphonso Davies", "country": "Canada", "club": "Bayern Munich", "league": "Bundesliga", "position": "LB", "age": 25, "height_cm": 183 },
    { "name": "Christian Pulisic", "country": "USA", "club": "AC Milan", "league": "Serie A", "position": "LW", "age": 27, "height_cm": 178 },
    { "name": "Weston McKennie", "country": "USA", "club": "Juventus", "league": "Serie A", "position": "CM", "age": 27, "height_cm": 185 },
    { "name": "Hirving Lozano", "country": "Mexico", "club": "PSV", "league": "Eredivisie", "position": "RW", "age": 30, "height_cm": 175 },

    { "name": "Harry Kane", "country": "England", "club": "Bayern Munich", "league": "Bundesliga", "position": "ST", "age": 32, "height_cm": 188 },
    { "name": "Phil Foden", "country": "England", "club": "Manchester City", "league": "Premier League", "position": "CAM", "age": 26, "height_cm": 171 },
    { "name": "Declan Rice", "country": "England", "club": "Arsenal", "league": "Premier League", "position": "CDM", "age": 27, "height_cm": 188 },
    { "name": "Kevin De Bruyne", "country": "Belgium", "club": "Manchester City", "league": "Premier League", "position": "CAM", "age": 34, "height_cm": 181 },
    { "name": "Jeremy Doku", "country": "Belgium", "club": "Manchester City", "league": "Premier League", "position": "LW", "age": 24, "height_cm": 173 },

    { "name": "Bernardo Silva", "country": "Portugal", "club": "Manchester City", "league": "Premier League", "position": "CAM", "age": 31, "height_cm": 173 },
    { "name": "Bruno Fernandes", "country": "Portugal", "club": "Manchester United", "league": "Premier League", "position": "CAM", "age": 32, "height_cm": 179 },
    { "name": "Rafael Leao", "country": "Portugal", "club": "AC Milan", "league": "Serie A", "position": "LW", "age": 27, "height_cm": 188 },
    { "name": "Joao Felix", "country": "Portugal", "club": "Barcelona", "league": "La Liga", "position": "FW", "age": 26, "height_cm": 181 },

    { "name": "Antoine Griezmann", "country": "France", "club": "Atletico Madrid", "league": "La Liga", "position": "FW", "age": 35, "height_cm": 176 },
    { "name": "Aurelien Tchouameni", "country": "France", "club": "Real Madrid", "league": "La Liga", "position": "CDM", "age": 26, "height_cm": 187 },
    { "name": "Eduardo Camavinga", "country": "France", "club": "Real Madrid", "league": "La Liga", "position": "CM", "age": 24, "height_cm": 182 },

    { "name": "Nicolo Barella", "country": "Italy", "club": "Inter", "league": "Serie A", "position": "CM", "age": 29, "height_cm": 172 },
    { "name": "Federico Chiesa", "country": "Italy", "club": "Juventus", "league": "Serie A", "position": "RW", "age": 28, "height_cm": 175 },

    { "name": "Achraf Hakimi", "country": "Morocco", "club": "PSG", "league": "Ligue 1", "position": "RB", "age": 27, "height_cm": 181 },
    { "name": "Hakim Ziyech", "country": "Morocco", "club": "Galatasaray", "league": "Super Lig", "position": "RW", "age": 33, "height_cm": 181 },

    { "name": "Heung-min Son", "country": "South Korea", "club": "Tottenham", "league": "Premier League", "position": "LW", "age": 34, "height_cm": 183 },
    { "name": "Takefusa Kubo", "country": "Japan", "club": "Real Sociedad", "league": "La Liga", "position": "RW", "age": 25, "height_cm": 173 },

    { "name": "Victor Osimhen", "country": "Nigeria", "club": "Napoli", "league": "Serie A", "position": "ST", "age": 27, "height_cm": 185 },
    { "name": "Mohamed Salah", "country": "Egypt", "club": "Liverpool", "league": "Premier League", "position": "RW", "age": 34, "height_cm": 175 },

    { "name": "Luis Diaz", "country": "Colombia", "club": "Liverpool", "league": "Premier League", "position": "LW", "age": 29, "height_cm": 180 },
    { "name": "James Rodriguez", "country": "Colombia", "club": "Sao Paulo", "league": "Brasileirao", "position": "CAM", "age": 34, "height_cm": 180 },

    { "name": "Angel Di Maria", "country": "Argentina", "club": "Benfica", "league": "Liga Portugal", "position": "RW", "age": 38, "height_cm": 180 }
];
]