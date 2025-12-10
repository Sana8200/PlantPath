export function UserPage(props) {
  return (
    <div>
      User details: {props.user ? props.user.email : "user email missing"}
    </div>
  );
}
