import * as React from "react";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { PlaylistMap } from "../../state/types";

interface SidebarProps {
  playlists: PlaylistMap;
  selectedView: string;
  navigate: (key: string) => void;
}

export const Sidebar: React.FunctionComponent<SidebarProps> = props => {
  const playlistLinks: INavLink[] = [];
  for (const k in props.playlists) {
    const playlist = props.playlists[k];
    const key = playlist.id;
    const navLink: INavLink = {
      key,
      name: playlist.name,
      url: `/playlists/${k}`,
      onClick: (e: any, _: any) => {
        e.preventDefault();
        props.navigate(key);
      }
    };
    playlistLinks.push(navLink);
  }
  const defaultGroup: INavLinkGroup = { links: [] };
  const playlistGroup: INavLinkGroup = {
    name: "Playlists",
    links: playlistLinks
  };
  const groups: INavLinkGroup[] = [defaultGroup, playlistGroup];
  return <Nav selectedKey={props.selectedView} groups={groups} />;
};
