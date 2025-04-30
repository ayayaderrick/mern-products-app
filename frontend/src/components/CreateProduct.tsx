import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must not be empty.",
  }),
  image: z.string().url({
    message: "Image must be a valid URL.",
  }),
});

const CreateProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      toast.error("Error creating product.");
      console.log("Error creating product.");
    }
    const data = await response.json();
    console.log(data);
    toast.success("Product created successfully.");
    // Reset the form after submission
    form.reset();

    // console.log(values);
  }
  return (
    <div className="max-w-5xl mx-auto mt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full px-5 sm:max-w-xl mx-auto space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
