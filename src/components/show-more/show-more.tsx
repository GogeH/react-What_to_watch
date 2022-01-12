function ShowMore(props: {
  handleLoadMore: () => void;
}):JSX.Element {

  return (
    <div className="catalog__more">
      <button className="catalog__button"
        type="button"
        onClick={props.handleLoadMore}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
