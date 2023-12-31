import { EntityState } from "@reduxjs/toolkit";
import { SubCategoryType } from "../featureTypes";

export const initialSubCategoryData: EntityState<SubCategoryType> = {
  ids: [
    "vEkbg08U3xIOQuDm6x050",
    "PFpLILifYjc1eB7-wt8TL",
    "MfcckZJwyd94Z0QBqNYzp",
    "3jGw3F699u1bKvDN9xS8W",
  ],
  entities: {
    vEkbg08U3xIOQuDm6x050: {
      id: "vEkbg08U3xIOQuDm6x050",
      name: "Demo Category 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      subCategories: ["3jGw3F699u1bKvDN9xS8W"],
      todoList: ["a6Gd5CzR5OrJiHXQWcqzg"],
      createdAt: "12/04/2022",
    },
    "PFpLILifYjc1eB7-wt8TL": {
      id: "PFpLILifYjc1eB7-wt8TL",
      name: "Demo Category 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.n",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",

      createdAt: "12/03/2022",
    },
    MfcckZJwyd94Z0QBqNYzp: {
      id: "MfcckZJwyd94Z0QBqNYzp",
      name: "Demo Category 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "n4kfA1mTlozkS1ZJgXh2F",
      createdAt: "12/02/2022",
    },
    "3jGw3F699u1bKvDN9xS8W": {
      id: "3jGw3F699u1bKvDN9xS8W",
      name: "Demo Category 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "vEkbg08U3xIOQuDm6x050",
      createdAt: "12/03/2022",
      subCategories: ["3jGw3F699u1_h23HDN9xS8W"],
    },
    "3jGw3F699u1_h23HDN9xS8W": {
      id: "3jGw3F699u1_h23HDN9xS8W",
      name: "Demo Category 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores assumenda reprehenderit voluptatum.",
      parentId: "3jGw3F699u1bKvDN9xS8W",
      createdAt: "12/03/2022",
    },
  },
};
