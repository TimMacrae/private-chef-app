"use client";

import { usePreferences } from "@/hooks/query/use-preferences.query";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { PreferenceSection } from "./preference-section";
import { PreferenceItemList } from "./preferences-inputs/preferences-item-list";

export function Preferences() {
  const { data: preferences, isLoading, error } = usePreferences();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading your preferences...</div>
      </div>
    );
  }

  if (error) {
    return (
      <FeedbackMessageError
        title="Error loading preferences"
        message={
          error instanceof Error ? error.message : "Something went wrong"
        }
      />
    );
  }

  return (
    <>
      <LayoutContentTitle title="Preferences" />

      {preferences && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Core Preferences */}

          <PreferenceSection title="Core Preferences">
            <PreferenceItemList
              title="Dietary Restrictions"
              preferenceKey="dietaryRestrictions"
            />

            <div>
              <h3 className="font-medium">Allergies:</h3>
              <p className="text-gray-600">
                {preferences.allergies.join(", ") || "None"}
              </p>
            </div>
            <div>
              <span className="font-medium">Likes:</span>
              <p className="text-gray-600">
                {preferences.likes.join(", ") || "None specified"}
              </p>
            </div>
            <div>
              <span className="font-medium">Dislikes:</span>
              <p className="text-gray-600">
                {preferences.dislikes.join(", ") || "None specified"}
              </p>
            </div>
          </PreferenceSection>

          {/* Culinary Preferences */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Culinary Preferences</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Preferred Cuisines:</span>
                <p className="text-gray-600">
                  {preferences.preferredCuisines.join(", ") || "None specified"}
                </p>
              </div>
              <div>
                <span className="font-medium">Chef Styles:</span>
                <p className="text-gray-600">
                  {preferences.preferredChefStyles.join(", ") ||
                    "None specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Meal Constraints */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Meal Constraints</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Max Prep Time:</span>
                <p className="text-gray-600">
                  {preferences.maxPrepTimeMinutes} minutes
                </p>
              </div>
              <div>
                <span className="font-medium">Budget Level:</span>
                <p className="text-gray-600">{preferences.budgetLevel}</p>
              </div>
              <div>
                <span className="font-medium">Cooking Skill:</span>
                <p className="text-gray-600">{preferences.cookingSkillLevel}</p>
              </div>
            </div>
          </div>

          {/* Kitchen Equipment */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Kitchen Setup</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Equipment:</span>
                <p className="text-gray-600">
                  {preferences.kitchenEquipment.join(", ") || "None specified"}
                </p>
              </div>
              <div>
                <span className="font-medium">Auto-adapt:</span>
                <p className="text-gray-600">
                  {preferences.autoAdaptBasedOnFeedback
                    ? "Enabled"
                    : "Disabled"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
