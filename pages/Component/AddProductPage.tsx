"use client";
import Style from "@/styles/AddProductPage.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { UseFormResetField } from "react-hook-form";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import { FcInfo } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z, ZodType } from "zod";

type Product_Type = {
  Product: {
    Product_Name: string;
    Select_Type: string;
    Brand: string;
    Price: number;
    Description: string;
  }[];
};

const valid_form: ZodType<Product_Type> = z.object({
  Product: z.array(
    z.object({
      Product_Name: string().min(1, { message: "productname is required" }),
      Select_Type: string().min(1, { message: "select language is required" }),
      Brand: string().min(1, { message: "brand is required" }),
      Price: number({ invalid_type_error: "Price Required" }).min(1, {
        message: "price is required",
      }),
      Description: string().min(10, { message: "min 10 character required" }),
    })
  ),
});

export default function AddProductPage() {
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ resolver: zodResolver(valid_form) });
  const { fields, append, remove } = useFieldArray({
    name: "Product",
    control,
  });
  const onsubmit = (data: Product_Type) => console.log(data);
  const resetData = (index: number) => {
    resetField(Product.$(index).Product_Name);
    // resetField(Product.${index}.Select_Type);
    // resetField(Product.${index}.Brand);
    // resetField(Product.${index}.Price);
    // resetField(Product.${index}.Description);
  };

  return (
    <>
      <div className={Style.main}>
        <div className={Style.formInput}>
          <Button
            color="blue"
            onClick={() =>
              append({
                Product_Name: "",
                Select_Type: "",
                Brand: "",
                Price: 0,
                Description: "",
              })
            }
          >
            Add Product
          </Button>
          <Button
            color="warning"
            className={Style.resetbtn}
            onClick={() => reset()}
          >
            Reset All
          </Button>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          {fields.map((field, index) => (
            <div className={Style.form} key={field.id}>
              <div className={Style.formInput}>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="Product_Name" value="Product Name :" />
                  </div>
                  <TextInput
                    id="Product_Name"
                    className={Style.input}
                    type="text"
                    // {...register(Product.${index}.Product_Name)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        ></span>
                      </>
                    }
                  />
                </div>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="SelectLanguage" value="Select Type :" />
                    <FcInfo className={Style.imga} />
                  </div>
                  <Select
                    className={Style.input}
                    id="SelectLanguage"
                    // {...register(Product.${index}.Select_Type)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        ></span>
                      </>
                    }
                  >
                    <option>Electronics</option>
                    <option>Android</option>
                    <option>iOS</option>
                    <option>Laptop</option>
                    <option>Others</option>
                  </Select>
                </div>
              </div>
              <div className={Style.formInput}>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="Brand" value="Brand" />
                  </div>
                  <TextInput
                    id="Brand"
                    className={Style.input}
                    type="text"
                    // {...register(Product.${index}.Brand)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        ></span>
                      </>
                    }
                  />
                </div>
                <div className={Style.formInputdiv}>
                  <div className={Style.inputtext}>
                    <Label htmlFor="Price" value="Price" />
                  </div>
                  <TextInput
                    id="Price"
                    type="number"
                    className={Style.input}
                    // {...register(Product.${index}.Price)}
                    helperText={
                      <>
                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            color: "#DC2626",
                          }}
                        ></span>
                      </>
                    }
                  />
                </div>
              </div>
              <div className={Style.description}>
                <div className={Style.descriptiontext}>
                  <Label htmlFor="comment" value="Description" />
                </div>
                <Textarea
                  id="comment"
                  placeholder="Description about the Product ...."
                  rows={5}
                  // {...register(Product.${index}.Description)}
                  className={Style.description_input}
                  helperText={
                    <>
                      <span
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                          color: "#DC2626",
                        }}
                      ></span>
                    </>
                  }
                />
              </div>
              <div className={Style.buttondiv}>
                <Button color="failure" onClick={() => remove(index)}>
                  Delete
                  <RiDeleteBin6Line className={Style.delete} />
                </Button>
                {/* <Button color="warning" onClick={() => resetData(index)}>
            Reset
          </Button> */}
                <Button
                  color="blue"
                  onClick={() =>
                    append({
                      Product_Name: "",
                      Select_Type: "",
                      Brand: "",
                      Price: 0,
                      Description: "",
                    })
                  }
                >
                  Add more Product
                </Button>
              </div>
            </div>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}