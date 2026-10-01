import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import MealsSection from '../components/meals/MealsSection'
import PageHeader from '../components/common/PageHeader'
import { useNavigate } from 'react-router-dom';
import categoriesService from '../services/categoriesService';

export default function Meals() {
  useEffect(() => {
    categoriesService.getAll();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="space-y-8 pt-8">
      {/* Header */}

      <PageHeader
        title="Meal Management"
        description="Manage your meals, categories, and availability."
        buttons={[
          {
            id: "add",
            text: "Add New Meal",
            icon: Plus,
            onClick: () => {
              navigate('/meals/addMeal/0');
            },
            mode: "primary-container"
          }
        ]}
      />

      {/* Filters + Table */}
      <section>
        <MealsSection />
      </section>

      {/* Statistics */}
      <section>
        {/* We'll build this next */}
      </section>
    </div>
  )
}
