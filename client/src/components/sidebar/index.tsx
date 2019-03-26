import * as React from "react";
import { Nav, INavLink, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { PlaylistMap } from "../../types";

interface SidebarProps {
  playlists: PlaylistMap;
  selectedView: string;
  navigate: (key: string) => void;
  createPlaylist: () => void;
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
  playlistLinks.push({
    key: "-add-playlist",
    name: "+ Create playlist", // can this have an icon?
    url: "#",
    onClick: (e: any, _: any) => {
      e.preventDefault();
      props.createPlaylist();
    }
  });
  const defaultGroup: INavLinkGroup = {
    links: [
      {
        key: "default",
        name: "All tracks",
        url: "/",
        onClick: (e: any, _: any) => {
          e.preventDefault();
          props.navigate("default");
        }
      }
    ]
  };
  const playlistGroup: INavLinkGroup = {
    name: "Playlists",
    links: playlistLinks
  };
  const groups: INavLinkGroup[] = [defaultGroup, playlistGroup];
  return <Nav selectedKey={props.selectedView} groups={groups} />;
};
