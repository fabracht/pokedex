export const ColorMatcher = (pokeType) => {
  switch (pokeType.toLowerCase()) {
    case "bug":
      return "#729F3F";
    case "dark":
      return "#707070";
    case "dragon":
      return "#53A4CF";
    case "electric":
      return "#EED535";
    case "fairy":
      return "#FDB9E9";
    case "fighting":
      return "#D56723";
    case "fire":
      return "#FD7D24";
    case "flying":
      return "#3DC7EF";
    case "ghost":
      return "#7B62A3";
    case "grass":
      return "#9BCC50";
    case "ground":
      return "#AB9842";
    case "ice":
      return "#51C4E7";
    case "normal":
      return "#A4ACAF";
    case "poison":
      return "#B97FC9";
    case "psychic":
      return "#F366B9";
    case "rock":
      return "#A38C21";
    case "steel":
      return "#9EB7B8";
    case "water":
      return "#4592C4";
    default:
      return "#707070";

  }
};
