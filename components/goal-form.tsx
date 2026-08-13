"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

const goalSchema = z.object({
  goalName: z.string().min(1, "Give your goal a name"),
  goalType: z.string().optional(),
  targetValue: z.coerce.number().positive("Must be a positive number").optional(),
  targetDate: z.string().optional(),
})

type GoalInput = z.input<typeof goalSchema>
type GoalValues = z.output<typeof goalSchema>

export function GoalForm({ userId }: { userId: string }) {
  const form = useForm<GoalInput, unknown, GoalValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goalName: "",
      goalType: "",
      targetValue: undefined,
      targetDate: "",
    },
  })

  const onSubmit = async (values: GoalValues) => {
    const { error } = await supabase.from("fitness_goals").insert([
      {
        user_id: userId,
        goal_name: values.goalName,
        goal_type: values.goalType || null,
        target_value: values.targetValue ?? null,
        target_date: values.targetDate || null,
      },
    ])

    if (error) {
      form.setError("root", { message: error.message })
      return
    }

    form.reset()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>New Fitness Goal</CardTitle>
        <CardDescription>Set a target and track it on your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="goalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Run a 5K" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Cardio, strength, weight..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="5"
                      {...field}
                      value={(field.value as number | string | undefined) ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
            )}

            {form.formState.isSubmitSuccessful && !form.formState.isDirty && (
              <p className="text-sm text-muted-foreground">Goal saved successfully!</p>
            )}

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Goal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
