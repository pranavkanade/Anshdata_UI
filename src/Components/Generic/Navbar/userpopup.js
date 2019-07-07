import { Popover, Whisper, Divider } from "rsuite";
import css from "./userpopup.scss";
import Link from "next/link";

const Speaker = (username, handleSignout) => {
  return (
    <Popover>
      <div className={css.ad_popup_header}>
        <span>
          Signed in as,
          <h4>{username}</h4>
        </span>
      </div>
      <Divider />
      <div className={css.ad_popup}>
        <Link href={`/u/${username}`}>
          <span className={css.ad_link}>Your Profile</span>
        </Link>
        <span className={css.ad_link}>Your Courses</span>
        <span className={css.ad_link}>Your Notifications</span>
        <span className={css.ad_link}>Your Bookmarks</span>
        <Divider />
        <span className={css.ad_link}>Help</span>
        <span className={css.ad_link}>Settings</span>
        <button
          className={css.ad_signOut}
          onClick={event => handleSignout(event)}>
          <span>Sign Out</span>
        </button>
      </div>
    </Popover>
  );
};

const UserPopup = props => {
  if (props.user === null || props.user === undefined) {
    return null;
  }
  return (
    <Whisper
      trigger="click"
      placement="bottomRight"
      speaker={Speaker(props.user.username, props.handleSignout)}>
      {props.children}
    </Whisper>
  );
};

export default UserPopup;
