import Card from '../common/Card'
import { ArrowBigRight, ArrowRight, BrainCircuit, ShoppingBag, Tags, TrendingUp, Utensils } from 'lucide-react'

export default function MealsCardSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      {/* Card 1 */}
      <Card
        title="Top Selling Meals"
        subtitle="Slow-Roasted Rips"
        icon={TrendingUp}
      >
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4">
            <div class="w-full bg-surface-container-highest rounded-full h-2">
              <div class="bg-primary-container  h-2 rounded-full w-[80%]"></div>
            </div>
            <span className="text-sm font-semibold text-primary">
              80%
            </span>
          </div>
          <p className='text-md text-on-surface-variant'>+12% Increase from last month</p>
        </div>
      </Card>

      {/* Card 2 */}
      <Card
        title="Inventory Alert"
        subtitle="4 Items Low"
        icon={Tags}
        mode="alert"
      >
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant">
              Avocado
            </span>

            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant">
              Wine Red
            </span>

            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant">
              Beef Tender
            </span>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-on-surface-variant">
              Cream
            </span>
          </div>
          <p className='text-md text-on-surface-variant'>Click to view procurment list</p>
        </div>
      </Card>

      {/* Card 3 */}
      <Card
        title="MENU OPTIMIZATION"
        subtitle="AI Recimmendation"
        icon={BrainCircuit}
        mode="info"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-on-surface-variant italic pr-3 mb-2">
            "Reduce price of 'Green Salad' by 5% to increase appetizer attachement rate by 15%"
          </span>
        </div>
        <span className="py-1 text-sm font-bold text-inverse-surface hover:cursor-pointer">
          Apply Suggestion
          <ArrowRight className="ml-1 inline-block" size={16} />
        </span>
      </Card>

    </div>
  )
}
