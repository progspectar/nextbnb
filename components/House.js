const House = (props) => {
  console.log(props);
  return (
    <div>
      <img src={props.picture} width='100%' alt='House picture' />
      <p>
        {props.type} -{props.town}
      </p>
      <p>{props.title}</p>
      <p>
        {props.rating} ({props.reviewsCount})
      </p>
    </div>
  );
};

export default House;

{
  /* <div>
  <img src={props.picture} width='100%' alt='House picture' />
  <p>
    {props.type} - {props.town}
  </p>
  <p>{props.title}</p>
  <p>
    {props.rating} ({props.reviewsCount})
  </p>
</div>; */
}
