"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      description: "Basic access to stock predictions",
      features: ["Limited stock predictions", "Basic market data", "Standard charts", "1-day delayed data"],
      buttonText: "Get Started",
      disabled: false,
    },
    {
      id: "basic",
      name: "Basic",
      price: 9.99,
      description: "Enhanced predictions and features",
      features: [
        "Unlimited stock predictions",
        "Enhanced market data",
        "Advanced charts",
        "Same-day data",
        "Email alerts",
      ],
      buttonText: "Subscribe",
      disabled: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 19.99,
      description: "Premium features for serious investors",
      features: [
        "All Basic features",
        "Real-time data",
        "Advanced technical indicators",
        "Portfolio tracking",
        "SMS alerts",
        "Historical performance analysis",
        "Priority support",
      ],
      buttonText: "Subscribe",
      disabled: false,
      popular: true,
    },
  ]

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId)
    if (planId !== "free") {
      setPaymentDialogOpen(true)
    } else {
      // Handle free plan signup
      window.location.href = "/sign-up"
    }
  }

  const handlePayment = () => {
    // In a real app, this would integrate with Razorpay
    alert(`Payment initiated for ${selectedPlan} plan!`)
    setPaymentDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your investment needs. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id)}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              Enter your payment details to subscribe to the {plans.find((plan) => plan.id === selectedPlan)?.name}{" "}
              plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ${plans.find((plan) => plan.id === selectedPlan)?.price}/month
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
