import { NextActionLink } from "@solana/actions-spec";

export const getCompletedAction = (): NextActionLink => {
  return {
    type: "inline",
    action: {
      description: `Event Description`,
      icon: `https://i.imgur.com/wKY2gEc.jpeg`,
      label: `Attending`,
      title: `Event name`,
      type: "completed",
    },
  };
};
