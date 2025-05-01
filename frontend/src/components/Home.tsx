import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Product {
  __v: number;
  _id: string;
  createdAt: string;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
}

interface UpdatedProduct {
  name?: string;
  price?: number;
  image?: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          toast.error("Error fetching products.");
          return;
        }
        const responseData = await response.json();
        // console.log("API Data Received:", responseData);

        if (responseData && Array.isArray(responseData.data)) {
          setProducts(responseData.data);
        } else if (Array.isArray(responseData)) {
          // Maybe it directly returns the array after all
          setProducts(responseData);
        } else {
          console.error(
            "API did not return an array or expected object structure:",
            responseData
          );
          toast.error("Received unexpected data format from server.");
          setProducts([]); // Set to empty array to prevent map error
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Error deleting product.");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Product deleted successfully.");

      // Update the UI after deletion
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product.");
    }
  };

  const handleUpdateProduct = async (
    id: string,
    updatedProduct: UpdatedProduct
  ) => {
    try {
      // Validate the updated product data before sending it to the server
      const validUpdates: UpdatedProduct = {};
      if (updatedProduct.name !== undefined)
        validUpdates.name = updatedProduct.name;
      if (updatedProduct.price !== undefined && !isNaN(updatedProduct.price))
        validUpdates.price = updatedProduct.price;
      if (updatedProduct.image !== undefined)
        validUpdates.image = updatedProduct.image;

      // Check if there are any actual updates to send
      if (Object.keys(validUpdates).length === 0) {
        toast.info("No changes detected to update.");
        return; // Exit if no changes
      }

      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validUpdates), // Send the updated product data
      });

      if (!response.ok) {
        // Try to get more error details from the response body if possible
        let errorMsg = "Error updating product.";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch (e) {
          // Ignore if response body is not JSON or empty
          console.log(e);
        }
        toast.error(errorMsg);
        return; // Don't update UI if backend failed
      }

      const data = await response.json();
      console.log("Updated data from the server: ", data);
      toast.success("Product updated successfully.");

      // Update the UI after update
      setProducts(
        products.map((product) =>
          // Use the data returned from the server if available and has an ID
          product._id === id
            ? data && data._id
              ? { ...product, ...data }
              : { ...product, ...validUpdates }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 py-12 px-4">
      <h1 className="text-xl sm:text-3xl font-semibold text-center">
        Current Products
        <div className="h-1 bg-muted-foreground w-44 mt-2 mx-auto" />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Map through the products and display them in cards */}

        {products.map((product) => (
          <Card key={product._id} className="w-full max-w-sm mx-auto ">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="flex items-center justify-center w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              {/* <CardDescription>This is a description</CardDescription> */}
              <p>Price: ${product.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between pb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>
                    <Pencil />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                    <DialogDescription>
                      Modify or edit details of the product here. Click 'Update'
                      to save your changes.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Product Name
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        defaultValue={product.name}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        type="string"
                        id="price"
                        defaultValue={product.price}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Image URL
                      </Label>
                      <Input
                        type="text"
                        id="image"
                        defaultValue={product.image}
                        className="col-span-3"
                      />
                    </div>
                  </form>
                  <DialogFooter className="flex justify-between">
                    <Button
                      type="submit"
                      onClick={() => {
                        // toast("Edit product clicked");
                        // Add your edit product logic here
                        handleUpdateProduct(product._id, {
                          name: (
                            document.getElementById("name") as HTMLInputElement
                          )?.value,
                          price: parseFloat(
                            (
                              document.getElementById(
                                "price"
                              ) as HTMLInputElement
                            )?.value || "0"
                          ),
                          image: (
                            document.getElementById("image") as HTMLInputElement
                          )?.value,
                        });
                      }}
                    >
                      Update
                    </Button>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast("Cancel clicked");
                          // Add your cancel logic here
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteProduct(product._id);
                }}
              >
                <Trash2 />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="flex flex-col sm:flex-row space-x-1 items-center justify-center mt-4">
          <p>No products found.</p>
          <Link to={"/create"} className="text-blue-500 ">
            Create a product
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
