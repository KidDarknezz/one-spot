export default {
  data() {
    return {
      allEventCategories: [
        { label: "Musica", value: "music" },
        { label: "Fiestas", value: "party" },
        { label: "Deportes", value: "sports" },
        { label: "Cultura", value: "culture" },
        { label: "Teatro", value: "theatre" },
        { label: "Conciertos", value: "concerts" },
        { label: "Ferias", value: "carnivals" },
        { label: "Aire Libre", value: "open-air" },
        { label: "Familia", value: "family" },
        { label: "Arte", value: "art" },
        { label: "Turismo", value: "tourism" },
        { label: "Discotecas", value: "clubs" },
        { label: "Bares", value: "bars" },
        { label: "Nightlife", value: "nightlife" },
        { label: "Festivales", value: "festivals" },
        { label: "Motivacional", value: "motivational" },
        { label: "Conferencias", value: "conferences" },
        { label: "Seminarios", value: "seminars" },
        { label: "Networking", value: "networking" },
        { label: "Expos", value: "expos" },
        { label: "Galas", value: "galas" },
        { label: "Gaming", value: "gaming" },
        { label: "Trending", value: "trending" },
      ],
    };
  },
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
