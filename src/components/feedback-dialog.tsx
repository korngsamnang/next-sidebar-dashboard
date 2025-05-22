"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Frown, Meh } from "lucide-react";
import { useCreateFeedback } from "@/hooks/use-create-feedback";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-context";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
    feedback: z.string().min(1, {
        message: "Please enter some feedback",
    }),
    reaction: z.enum(["smile", "meh", "frown"], {
        required_error: "Please select a reaction",
    }),
});

export default function FeedbackDialog() {
    const { createFeedback, isPending } = useCreateFeedback();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            feedback: "",
            reaction: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createFeedback(
            {
                text: values.feedback,
                reactions: values.reaction,
                user_id: user?.id,
                user_type: "admin",
            },
            {
                onSuccess: () => {
                    form.reset();
                    setOpen(false);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-md h-8 mr-2">
                    Leave Feedback
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background text-foreground border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">
                        Leave Feedback
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <p className="text-muted-foreground">
                            We&apos;d love to hear what went well or how we can
                            improve the product experience.
                        </p>

                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your feedback"
                                            {...field}
                                            className="min-h-[100px] bg-background border-border focus:border-input text-foreground"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reaction"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className={`rounded-md p-2 transition-colors ${
                                                field.value === "smile"
                                                    ? "bg-green-100 border-green-400 hover:bg-green-100/90"
                                                    : "bg-background hover:bg-green-100/30"
                                            }`}
                                            onClick={() =>
                                                field.onChange("smile")
                                            }
                                        >
                                            <Smile
                                                className={`h-6 w-6 ${
                                                    field.value === "smile"
                                                        ? "text-green-600"
                                                        : "text-foreground"
                                                }`}
                                            />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className={`rounded-md p-2 transition-colors ${
                                                field.value === "meh"
                                                    ? "bg-yellow-100 border-yellow-400 hover:bg-yellow-100/90"
                                                    : "bg-background hover:bg-yellow-100/30"
                                            }`}
                                            onClick={() =>
                                                field.onChange("meh")
                                            }
                                        >
                                            <Meh
                                                className={`h-6 w-6 ${
                                                    field.value === "meh"
                                                        ? "text-yellow-600"
                                                        : "text-foreground"
                                                }`}
                                            />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className={`rounded-md p-2 transition-colors ${
                                                field.value === "frown"
                                                    ? "bg-red-100 border-red-400 hover:bg-red-100/90"
                                                    : "bg-background hover:bg-red-100/30"
                                            }`}
                                            onClick={() =>
                                                field.onChange("frown")
                                            }
                                        >
                                            <Frown
                                                className={`h-6 w-6 ${
                                                    field.value === "frown"
                                                        ? "text-red-600"
                                                        : "text-foreground"
                                                }`}
                                            />
                                        </Button>
                                    </div>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="bg-background text-foreground border-border hover:bg-secondary/50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Spinner
                                        size="small"
                                        className="text-white"
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
