import { Popup, Divider } from "semantic-ui-react";
import css from "./userpopup.scss";
import Link from "next/link";

export default props => {
  return (
    <Popup trigger={props.children} on="click" wide="very">
      <Popup.Header>
        <span>
          Signed in as,
          <h3>{props.user.username}</h3>
        </span>
      </Popup.Header>
      <Divider />
      <Popup.Content className={css.popup}>
        <Link href={`/u/${props.user.username}`}>
          <span className={css.link}>Your Profile</span>
        </Link>

        <span className={css.link}>Your Courses</span>
        <span className={css.link}>Your Notifications</span>
        <span className={css.link}>Your Bookmarks</span>
        <Divider />
        <span className={css.link}>Help</span>
        <span className={css.link}>Settings</span>
        <button
          className={css.signOut}
          onClick={event => props.handleSignout(event)}>
          <span>Sign Out</span>
        </button>
      </Popup.Content>
    </Popup>
  );
};
