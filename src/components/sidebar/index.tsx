import * as React from "react";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

export const Sidebar: React.FunctionComponent = props => {
  const defaultGroup: INavLinkGroup = { links: [] };
  const playlistGroup: INavLinkGroup = { name: "Playlists", links: [] };
  const groups: INavLinkGroup[] = [defaultGroup, playlistGroup];
  return <Nav groups={groups} />;
};
