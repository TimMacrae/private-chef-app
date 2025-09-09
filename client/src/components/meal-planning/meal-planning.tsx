"use client";
import { Table } from "../ui/table";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { LayoutContentTitle } from "../layout/layout-content-title";

import { useMealPlanning } from "@/hooks/query/use-meal-planning.query";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useUpdateMealPlanning } from "./mutation/use-update-meal-planning.mutation";
import { LoadingSpinner } from "../feedback/loading-spinner";
import { MealPlanning as MealPlanningType } from "./meal-planning.type";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const mealTimes = ["breakfast", "lunch", "dinner"];

export function MealPlanning() {
  const { data: mealPlan, isLoading, error } = useMealPlanning();
  const { mutate: updateMealPlan } = useUpdateMealPlanning();

  const handleCellClick = (day: string, mealTime: string) => {
    if (!mealPlan) return;

    const dayKey = day as keyof MealPlanningType;
    const mealKey = mealTime as keyof MealPlanningType[typeof dayKey];
    const currentStatus = mealPlan[dayKey]?.[mealKey];
    const updatedPlan = JSON.parse(JSON.stringify(mealPlan));

    if (updatedPlan[dayKey]) {
      updatedPlan[dayKey][mealKey] = !currentStatus;
    }

    updateMealPlan(updatedPlan);
  };

  const handleToggleActive = (isActive: boolean) => {
    if (!mealPlan) return;

    const updatedPlan = {
      ...mealPlan,
      active: isActive,
    };

    updateMealPlan(updatedPlan);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <FeedbackMessageError
        title="Error loading meal planning"
        message={
          error instanceof Error ? error.message : "Something went wrong"
        }
      />
    );
  }

  return (
    <div>
      <LayoutContentTitle title="Meal Planning" />
      {mealPlan && (
        <div>
          <div
            className={`border rounded-lg transition-opacity ${
              !mealPlan.active ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Table data-testid="meal-planning-table">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[120px]">Day</TableHead>
                  {mealTimes.map((mealTime) => (
                    <TableHead
                      key={mealTime}
                      className="capitalize text-center"
                      data-testid={`meal-planning-table-head-${mealTime}`}
                    >
                      {mealTime}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {weekDays.map((day) => (
                  <TableRow key={day} className="hover:bg-transparent">
                    <TableCell
                      className="font-medium capitalize"
                      data-testid={`meal-planning-table-cell-${day}`}
                    >
                      {day}
                    </TableCell>
                    {mealTimes.map((mealTime) => {
                      const isChecked =
                        mealPlan[day as keyof typeof mealPlan]?.[
                          mealTime as keyof (typeof mealPlan)[keyof typeof mealPlan]
                        ];
                      return (
                        <TableCell
                          key={`${day}-${mealTime}`}
                          className="text-center"
                        >
                          <Button
                            variant="ghost"
                            className="w-full h-full hover:bg-transparent hover:cursor-pointer"
                            data-testid={`meal-planning-table-cell-button-${day}-${mealTime}`}
                            onClick={() => handleCellClick(day, mealTime)}
                          >
                            <Check
                              data-testid={`meal-planning-table-cell-check-${day}-${mealTime}`}
                              className={`mx-auto h-4 w-4 text-primary transition-opacity ${
                                isChecked ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </Button>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center space-x-2 justify-end mt-4">
            <Label htmlFor="toggle-meal-planning">
              {mealPlan.active ? "Deactivate" : "Activate"}
            </Label>
            <Switch
              id="toggle-meal-planning"
              data-testid="meal-planning-switch"
              checked={mealPlan.active}
              onCheckedChange={handleToggleActive}
            />
          </div>
        </div>
      )}
    </div>
  );
}
