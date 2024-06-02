export type PagingObj = {
  limit: number; //Représente le nombre d'éléments à afficher par page.
  page: number;//Représente le numéro de la page à afficher
};

export type Meta = {
  totalDocs: number | undefined; // Le nombre total de documents dans la collection
  limit: number | undefined; //Le nombre d'éléments par page
  totalPages: number | undefined;
  page: number | undefined; //Le numéro de la page actuelle
  pagingCounter: number | undefined;//Le numéro de la page actuelle
  hasPrevPage: Boolean | undefined;
  hasNextPage: Boolean | undefined;
  prevPage: number | undefined;
  nextPage: number | undefined;
  hasMore: Boolean | undefined;
};