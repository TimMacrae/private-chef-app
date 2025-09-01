"use client";

import { usePreferences } from "@/hooks/query/use-preferences.query";
import { FeedbackMessageError } from "../feedback/feedback-message-error";
import { LayoutContentTitle } from "../layout/layout-content-title";
import { PreferenceSection } from "./preference-section";
import { PreferenceItemList } from "./preferences-inputs/preferences-item-list";
import { PreferencesItemSelect } from "./preferences-inputs/preferences-item-select";
import { PreferencesItemCheckbox } from "./preferences-inputs/preferences-item-checkbox";
import { LoadingSpinner } from "../feedback/loading-spinner";

export function Preferences() {
  const { data: preferences, isLoading, error } = usePreferences();

  if (isLoading) {
    return <LoadingSpinner />;
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
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 w-7xl"
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

          {/* Culinary Preferences */}
          <PreferenceSection
            dataTestId="preferences-section-culinary-preferences"
            title="Culinary Preferences"
          >
            <PreferenceItemList
              title="Preferred Cuisines"
              preferenceKey="preferredCuisines"
            />
            <PreferenceItemList
              title="Exclude Cuisines"
              preferenceKey="excludedCuisines"
            />
            <PreferenceItemList
              title="Preferred Chef Styles"
              preferenceKey="preferredChefStyles"
            />
            <PreferenceItemList
              title="Excluded Chef Styles"
              preferenceKey="excludedChefStyles"
            />
          </PreferenceSection>

          {/* Seasonal Preferences */}
          <PreferenceSection
            dataTestId="preferences-section-seasonal-preferences"
            title="Seasonal Preferences"
          >
            <PreferencesItemCheckbox
              title="Spring"
              preferenceKey="seasonalPreferences"
              preferenceSubKey="spring"
            />
            <PreferencesItemCheckbox
              title="Summer"
              preferenceKey="seasonalPreferences"
              preferenceSubKey="summer"
            />
            <PreferencesItemCheckbox
              title="Autumn"
              preferenceKey="seasonalPreferences"
              preferenceSubKey="autumn"
            />
            <PreferencesItemCheckbox
              title="Winter"
              preferenceKey="seasonalPreferences"
              preferenceSubKey="winter"
            />
          </PreferenceSection>
        </div>
      )}
    </>
  );
}
