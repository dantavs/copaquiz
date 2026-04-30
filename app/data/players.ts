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
    { "name": "Kylian Mbappé", "country": "França", "club": "Real Madrid", "league": "La Liga", "position": "Atacante", "age": 27, "height_cm": 178 },
    { "name": "Vinicius Jr", "country": "Brasil", "club": "Real Madrid", "league": "La Liga", "position": "Atacante", "age": 26, "height_cm": 176 },
    { "name": "Rodrygo", "country": "Brasil", "club": "Real Madrid", "league": "La Liga", "position": "Atacante", "age": 25, "height_cm": 174 },
    { "name": "Endrick", "country": "Brasil", "club": "Real Madrid", "league": "La Liga", "position": "Atacante", "age": 20, "height_cm": 173 },
    { "name": "Estevão", "country": "Brasil", "club": "Palmeiras", "league": "Brasileirão", "position": "Atacante", "age": 19, "height_cm": 176 },
    { "name": "Neymar", "country": "Brasil", "club": "Al Hilal", "league": "Saudi Pro League", "position": "Atacante", "age": 34, "height_cm": 175 },
    { "name": "Raphinha", "country": "Brasil", "club": "Barcelona", "league": "La Liga", "position": "Atacante", "age": 29, "height_cm": 176 },
    { "name": "Bruno Guimarães", "country": "Brasil", "club": "Newcastle", "league": "Premier League", "position": "Meio-campista", "age": 28, "height_cm": 182 },
    { "name": "Lucas Paquetá", "country": "Brasil", "club": "West Ham", "league": "Premier League", "position": "Meio-campista", "age": 28, "height_cm": 180 },
    { "name": "Casemiro", "country": "Brasil", "club": "Manchester United", "league": "Premier League", "position": "Meio-campista", "age": 34, "height_cm": 185 },
    { "name": "Éder Militão", "country": "Brasil", "club": "Real Madrid", "league": "La Liga", "position": "Defensor", "age": 28, "height_cm": 186 },
    { "name": "Marquinhos", "country": "Brasil", "club": "PSG", "league": "Ligue 1", "position": "Defensor", "age": 32, "height_cm": 183 },
    { "name": "Alisson", "country": "Brasil", "club": "Liverpool", "league": "Premier League", "position": "Goleiro", "age": 34, "height_cm": 191 },

    { "name": "Lionel Messi", "country": "Argentina", "club": "Inter Miami", "league": "MLS", "position": "Atacante", "age": 39, "height_cm": 170 },
    { "name": "Lautaro Martínez", "country": "Argentina", "club": "Inter", "league": "Serie A", "position": "Atacante", "age": 28, "height_cm": 174 },
    { "name": "Julián Álvarez", "country": "Argentina", "club": "Manchester City", "league": "Premier League", "position": "Atacante", "age": 26, "height_cm": 170 },
    { "name": "Enzo Fernández", "country": "Argentina", "club": "Chelsea", "league": "Premier League", "position": "Meio-campista", "age": 25, "height_cm": 178 },
    { "name": "Mac Allister", "country": "Argentina", "club": "Liverpool", "league": "Premier League", "position": "Meio-campista", "age": 27, "height_cm": 176 },

    { "name": "Federico Valverde", "country": "Uruguai", "club": "Real Madrid", "league": "La Liga", "position": "Meio-campista", "age": 27, "height_cm": 182 },
    { "name": "Darwin Núñez", "country": "Uruguai", "club": "Liverpool", "league": "Premier League", "position": "Atacante", "age": 27, "height_cm": 187 },

    { "name": "Luis Díaz", "country": "Colômbia", "club": "Liverpool", "league": "Premier League", "position": "Atacante", "age": 29, "height_cm": 180 },
    { "name": "James Rodríguez", "country": "Colômbia", "club": "São Paulo", "league": "Brasileirão", "position": "Meio-campista", "age": 34, "height_cm": 180 },

    { "name": "Christian Pulisic", "country": "Estados Unidos", "club": "AC Milan", "league": "Serie A", "position": "Atacante", "age": 27, "height_cm": 178 },
    { "name": "Weston McKennie", "country": "Estados Unidos", "club": "Juventus", "league": "Serie A", "position": "Meio-campista", "age": 27, "height_cm": 185 },
    { "name": "Giovanni Reyna", "country": "Estados Unidos", "club": "Borussia Dortmund", "league": "Bundesliga", "position": "Meio-campista", "age": 24, "height_cm": 185 },

    { "name": "Alphonso Davies", "country": "Canadá", "club": "Bayern Munich", "league": "Bundesliga", "position": "Defensor", "age": 25, "height_cm": 183 },

    { "name": "Hirving Lozano", "country": "México", "club": "PSV", "league": "Eredivisie", "position": "Atacante", "age": 30, "height_cm": 175 },
    { "name": "Santiago Giménez", "country": "México", "club": "Feyenoord", "league": "Eredivisie", "position": "Atacante", "age": 25, "height_cm": 182 },

    { "name": "Harry Kane", "country": "Inglaterra", "club": "Bayern Munich", "league": "Bundesliga", "position": "Atacante", "age": 32, "height_cm": 188 },
    { "name": "Jude Bellingham", "country": "Inglaterra", "club": "Real Madrid", "league": "La Liga", "position": "Meio-campista", "age": 23, "height_cm": 186 },
    { "name": "Bukayo Saka", "country": "Inglaterra", "club": "Arsenal", "league": "Premier League", "position": "Atacante", "age": 24, "height_cm": 178 },
    { "name": "Phil Foden", "country": "Inglaterra", "club": "Manchester City", "league": "Premier League", "position": "Meio-campista", "age": 26, "height_cm": 171 },
    { "name": "Declan Rice", "country": "Inglaterra", "club": "Arsenal", "league": "Premier League", "position": "Meio-campista", "age": 27, "height_cm": 188 },

    { "name": "Pedri", "country": "Espanha", "club": "Barcelona", "league": "La Liga", "position": "Meio-campista", "age": 23, "height_cm": 174 },
    { "name": "Gavi", "country": "Espanha", "club": "Barcelona", "league": "La Liga", "position": "Meio-campista", "age": 22, "height_cm": 173 },
    { "name": "Lamine Yamal", "country": "Espanha", "club": "Barcelona", "league": "La Liga", "position": "Atacante", "age": 19, "height_cm": 178 },

    { "name": "Florian Wirtz", "country": "Alemanha", "club": "Bayer Leverkusen", "league": "Bundesliga", "position": "Meio-campista", "age": 23, "height_cm": 177 },
    { "name": "Jamal Musiala", "country": "Alemanha", "club": "Bayern Munich", "league": "Bundesliga", "position": "Meio-campista", "age": 23, "height_cm": 180 },

    { "name": "Kevin De Bruyne", "country": "Bélgica", "club": "Manchester City", "league": "Premier League", "position": "Meio-campista", "age": 34, "height_cm": 181 },
    { "name": "Jeremy Doku", "country": "Bélgica", "club": "Manchester City", "league": "Premier League", "position": "Atacante", "age": 24, "height_cm": 173 },

    { "name": "Bernardo Silva", "country": "Portugal", "club": "Manchester City", "league": "Premier League", "position": "Meio-campista", "age": 31, "height_cm": 173 },
    { "name": "Bruno Fernandes", "country": "Portugal", "club": "Manchester United", "league": "Premier League", "position": "Meio-campista", "age": 32, "height_cm": 179 },
    { "name": "Rafael Leão", "country": "Portugal", "club": "AC Milan", "league": "Serie A", "position": "Atacante", "age": 27, "height_cm": 188 },
    { "name": "João Félix", "country": "Portugal", "club": "Barcelona", "league": "La Liga", "position": "Atacante", "age": 26, "height_cm": 181 },

    { "name": "Achraf Hakimi", "country": "Marrocos", "club": "PSG", "league": "Ligue 1", "position": "Defensor", "age": 27, "height_cm": 181 },

    { "name": "Heung-min Son", "country": "Coreia do Sul", "club": "Tottenham", "league": "Premier League", "position": "Atacante", "age": 34, "height_cm": 183 },
    { "name": "Takefusa Kubo", "country": "Japão", "club": "Real Sociedad", "league": "La Liga", "position": "Atacante", "age": 25, "height_cm": 173 },

    { "name": "Victor Osimhen", "country": "Nigéria", "club": "Napoli", "league": "Serie A", "position": "Atacante", "age": 27, "height_cm": 185 },
    { "name": "Mohamed Salah", "country": "Egito", "club": "Liverpool", "league": "Premier League", "position": "Atacante", "age": 34, "height_cm": 175 },

    { "name": "Ederson", "country": "Brasil", "club": "Manchester City", "league": "Premier League", "position": "Goleiro", "age": 32, "height_cm": 188 },
    { "name": "Emiliano Martínez", "country": "Argentina", "club": "Aston Villa", "league": "Premier League", "position": "Goleiro", "age": 34, "height_cm": 195 },
    { "name": "Mike Maignan", "country": "França", "club": "AC Milan", "league": "Serie A", "position": "Goleiro", "age": 31, "height_cm": 191 },
    { "name": "Marc-André ter Stegen", "country": "Alemanha", "club": "Barcelona", "league": "La Liga", "position": "Goleiro", "age": 34, "height_cm": 187 },
    { "name": "Unai Simón", "country": "Espanha", "club": "Athletic Bilbao", "league": "La Liga", "position": "Goleiro", "age": 29, "height_cm": 190 }
]
    ;