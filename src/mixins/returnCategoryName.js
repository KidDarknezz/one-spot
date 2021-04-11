export default {
  methods: {
    categoryName(cat) {
      switch (cat) {
        case "":
          return "Todas";
        case "music":
          return "Musica";
        case "party":
          return "Fiestas";
        case "sports":
          return "Deportes";
        case "culture":
          return "Cultura";
        case "theatre":
          return "Teatro";
        case "concerts":
          return "Conciertos";
        case "carnivals":
          return "Ferias";
        case "open-air":
          return "Aire Libre";
        case "family":
          return "Familia";
        case "art":
          return "Arte";
        case "tourism":
          return "Turismo";
        case "clubs":
          return "Discotecas";
        case "bars":
          return "Bares";
        case "nightlife":
          return "Nightlife";
        case "festivals":
          return "Festivales";
        case "motivational":
          return "Motivacional";
        case "conferences":
          return "Conferencias";
        case "serminars":
          return "Seminarios";
        case "networking":
          return "Networking";
        case "expos":
          return "Expos";
        case "galas":
          return "Galas";
        case "gaming":
          return "Gaming";
        case "trending":
          return "Trending";
      }
    },
  },
};
