import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// actions
import { markNotificationsRead } from "../../redux/actions/userActions";
// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

export default function() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  let [anchorEl, setAnchoEl] = useState(null);
  const { notifications } = user;

  dayjs.extend(relativeTime);

  const handleOpen = e => {
    setAnchoEl(e.target);
  };
  const handleClose = () => {
    setAnchoEl(null);
  };
  const handleMenuOpened = () => {
    let unreadNotificationIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    dispatch(markNotificationsRead(unreadNotificationIds));
  };

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter(not => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }
  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not, index) => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={index} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="initial"
              variant="body1"
              to={`/user/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
}
