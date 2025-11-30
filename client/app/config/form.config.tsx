import { User } from "lucide-react";
import { DropDownOption } from "../models/dropdown.modal";

export const formConfig = {
  test: {
    info: [
      {
        type: "title",
        mode: {
          add: { value: "Create New Product" },
          edit: { value: "Edit Product" },
        },
      },
      {
        type: "desc",
        mode: {
          add: { value: "Fill in the details to add a new product" },
          edit: { value: "Update the product details below" },
        },
      },
    ],

    sections: [
      {
        title: "Basic Information",
        fields: [
          {
            name: "productName",
            type: "text",
            label: "Product Name",
            required: true,
            placeholder: "Enter Product Name",
          },
          {
            name: "sku",
            type: "text",
            label: "SKU Code",
            placeholder: "ABC123",
          },
          {
            name: "category",
            type: "dropdown",
            label: "Category",
            required: true,
            placeholder: "Select Category",
            options: [
              { id: "fashion", value: "Fashion" },
              { id: "electronics", value: "Electronics" },
              { id: "grocery", value: "Grocery" },
            ] as DropDownOption[],
          },
          {
            name: "category2",
            type: "dropdown",
            label: "New Category",
            required: true,
            placeholder: "Select Category",
            options: [
              { id: "fashion", value: "Fashion" },
              { id: "electronics", value: "Electronics" },
              { id: "grocery", value: "Grocery" },
            ] as DropDownOption[],
          },
          {
            name: "description",
            type: "textarea",
            label: "Product Description",
            placeholder: "Enter description",
          },
        ],
      },
      {
        title: "Availability & Media",
        fields: [
          {
            name: "releaseDate",
            type: "date",
            label: "Release Date",
            required: true,
            min: 20240101,
          },
          {
            name: "time",
            type: "dropdown",
            label: "time",
            required: true,
            placeholder: "Select time",
            options: [
              { id: 10, value: "Ten" },
              { id: 20, value: "Twenty" },
              { id: 30, value: "Thirty" },
            ] as DropDownOption[],
          },
          {
            name: "productImages",
            type: "uploadbox",
            label: "Upload Product Images",
          },
        ],
      },
    ],
    preview: [
      {
        type: "heading",
        key: "productName",
        displayName: "Product Name",
        avatarKey: "productImages",
        icon : User
      },
      {
        sectionName: "Basic Information",
        fields: [
          { type: "text", key: "sku", displayName: "SKU Code" },
          { type: "text", key: "category", displayName: "Category" },
          { type: "text", key: "category2", displayName: "New Category" },
          {
            type: "text",
            key: "description",
            displayName: "Product Description",
          },
        ],
      },
      {
        sectionName: "Availability & Media",
        fields: [
          { type: "text", key: "releaseDate", displayName: "Release Date" },
          { type: "text", key: "time", displayName: "Time" },
        ],
      },
    ],
  },
};
