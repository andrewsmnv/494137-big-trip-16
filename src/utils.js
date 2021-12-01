export const flipACoin = () => {
  const side = Math.floor((Math.random() * 100));
  if(side >= 50) {
    return true;
  } else {
    return false;
  }
};

export const getRandomInt = (min,max) =>
  min + Math.floor(Math.random() * (max - min + 1));
