"use client";

import { usePreferences } from "@/hooks/query/use-preferences.query";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { PreferenceSection } from "./preference-section";
import { PreferenceItemList } from "./preferences-inputs/preferences-item-list";
import { PreferencesItemSelect } from "./preferences-inputs/prefrences-item-select";

export function Preferences() {
  const { data: preferences, isLoading, error } = usePreferences();

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center p-8"
        data-testid="loading-container"
      >
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
        <div
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          data-testid="preferences-section-container"
        >
          {/* Core Preferences */}

          <PreferenceSection
            dataTestId="preferences-section-core-preferences"
            title="Core Preferences"
          >
            <PreferenceItemList
              title="Dietary Restrictions"
              preferenceKey="dietaryRestrictions"
            />
            <PreferenceItemList title="Allergies" preferenceKey="allergies" />
            <PreferenceItemList title="Likes" preferenceKey="likes" />
            <PreferenceItemList title="Dislikes" preferenceKey="dislikes" />
          </PreferenceSection>

          <PreferenceSection
            dataTestId="preferences-section-culinary-preferences"
            title="Culinary Preferences"
          >
            <PreferenceItemList
              title="Preferred Cuisines"
              preferenceKey="preferredCuisines"
            />
            <PreferenceItemList
              title="Preferred Chef Styles"
              preferenceKey="preferredChefStyles"
            />
            {/* Seasonal Preferences */}
            <PreferenceSection
              dataTestId="preferences-section-season"
              title="Seasonal Preferences"
            >
              <PreferenceItemList
                title="Spring"
                preferenceKey="seasonalPreferences.spring"
              />
            </PreferenceSection>
          </PreferenceSection>

          {/* Meal Constraints */}
          <PreferenceSection
            dataTestId="preferences-section-meal-constraints"
            title="Meal Constraints"
          >
            <PreferencesItemSelect
              title="Max Prep Time"
              preferenceKey="maxPrepTimeMinutes"
            />
            <PreferencesItemSelect
              title="Budget Level"
              preferenceKey="budgetLevel"
            />
            <PreferencesItemSelect
              title="Cooking Skill Level"
              preferenceKey="cookingSkillLevel"
            />
          </PreferenceSection>

          {/* Kitchen Equipment */}
          {/* <div className="bg-white p-6 rounded-lg shadow-sm border">
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
          </div> */}
        </div>
      )}
    </>
  );
}
