'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from 'lucide-react'

const goalCategories = [
  {
    name: "Personal Goals",
    options: [
      "Daily gratitude", "Boost self-confidence", "Meditate daily", "Declutter home",
      "Self-care routine", "Be more Organised", "Work-life balance",
      "Improve emotional intelligence", "Set boundaries", "Start a personal blog"
    ]
  },
  {
    name: "Health Goals",
    options: [
      "Regular exercise", "Healthy eating", "Drink more water", "Improve sleep",
      "Reduce sugar intake", "Practice yoga", "10,000 steps daily",
      "Complete fitness challenge", "Meal prepping", "Reduce screen time"
    ]
  },
  {
    name: "Wealth Goals",
    options: [
      "Save income", "Pay off debt", "Build emergency fund", "Start investing",
      "Monthly budget", "Passive income stream", "Save for home",
      "Boost credit score", "Personal finance course", "Plan for retirement"
    ]
  },
  {
    name: "Career Goals",
    options: [
      "Get promotion/raise", "Learn new skill", "Start side business", "Network with professionals",
      "Improve public speaking", "Find a mentor", "Change career path",
      "Take leadership role", "Improve time management", "Attend professional workshop"
    ]
  },
  {
    name: "Relationship/Family Goals",
    options: [
      "Weekly family night", "Regular date night", "Call parents weekly", "Practice active listening",
      "Create family traditions", "Device-free family time", "Surprise loved ones",
      "Resolve conflicts", "Show gratitude", "Volunteer together"
    ]
  },
  {
    name: "Travel Goals",
    options: [
      "Visit new country", "Solo trip", "Bucket-list adventure", "Unique accommodations",
      "Learn foreign language", "Travel savings fund", "Local exploration",
      "Family vacation", "Spontaneous travel", "Cultural immersion"
    ]
  }
]

const generateAffirmation = (goal: string) => {
  const affirmations = {
    "Daily gratitude": "I am grateful for all the blessings in my life, big and small.",
    "Boost self-confidence": "I am confident and capable in all that I do.",
    "Meditate daily": "I prioritize my mental well-being through daily meditation.",
    "Declutter home": "My home is a peaceful and organized sanctuary.",
    "Self-care routine": "I deserve and prioritize time for self-care and rejuvenation.",
    "Be more Organised": "I am organized and efficient in all aspects of my life.",
    "Work-life balance": "I maintain a healthy balance between my work and personal life.",
    "Improve emotional intelligence": "I am emotionally aware and respond to others with empathy and understanding.",
    "Set boundaries": "I confidently set and maintain healthy boundaries in all my relationships.",
    "Start a personal blog": "I have valuable insights to share, and my blog inspires others.",
    "Regular exercise": "I am committed to my fitness journey and enjoy the benefits of regular exercise.",
    "Healthy eating": "I nourish my body with healthy, nutritious foods that energize me.",
    "Drink more water": "I prioritize hydration and feel refreshed and energized throughout the day.",
    "Improve sleep": "I enjoy restful and rejuvenating sleep each night.",
    "Reduce sugar intake": "I make healthy choices that support my well-being and vitality.",
    "Practice yoga": "Through yoga, I cultivate strength, flexibility, and inner peace.",
    "10,000 steps daily": "I am active and energetic, easily achieving my daily step goal.",
    "Complete fitness challenge": "I am determined and capable of achieving my fitness goals.",
    "Meal prepping": "I am organized and prepared with nutritious meals that support my health.",
    "Reduce screen time": "I balance my digital life with meaningful offline experiences.",
    "Save income": "I am a smart saver, building a secure financial future for myself.",
    "Pay off debt": "I am committed to financial freedom and am successfully paying off my debts.",
    "Build emergency fund": "I am financially prepared for any situation that may arise.",
    "Start investing": "I make wise investment decisions that grow my wealth over time.",
    "Monthly budget": "I am in control of my finances and stick to my budget with ease.",
    "Passive income stream": "I create multiple streams of income that support my financial goals.",
    "Save for home": "I am on the path to homeownership, saving diligently for my dream home.",
    "Boost credit score": "My credit score improves steadily, opening new financial opportunities.",
    "Personal finance course": "I am constantly expanding my financial knowledge and making informed decisions.",
    "Plan for retirement": "I am securing a comfortable and enjoyable retirement for my future self.",
    "Get promotion/raise": "I am worthy of recognition and advancement in my career.",
    "Learn new skill": "I am constantly growing and acquiring valuable new skills.",
    "Start side business": "I have the entrepreneurial spirit and skills to build a successful side business.",
    "Network with professionals": "I confidently connect with others, building a strong professional network.",
    "Improve public speaking": "I am an articulate and confident public speaker.",
    "Find a mentor": "I attract positive mentors who guide me towards success.",
    "Change career path": "I have the courage and skills to successfully transition to a fulfilling new career.",
    "Take leadership role": "I am a natural leader, inspiring and guiding others to success.",
    "Improve time management": "I efficiently manage my time, balancing productivity and self-care.",
    "Attend professional workshop": "I actively seek out and benefit from professional development opportunities.",
    "Weekly family night": "I prioritize quality time with my family, strengthening our bonds.",
    "Regular date night": "I nurture my romantic relationship with dedicated quality time.",
    "Call parents weekly": "I maintain strong, loving connections with my family.",
    "Practice active listening": "I am fully present and attentive in my conversations with others.",
    "Create family traditions": "I create meaningful traditions that bring joy and connection to my family.",
    "Device-free family time": "I engage fully with my loved ones, free from digital distractions.",
    "Surprise loved ones": "I bring joy and excitement to my relationships through thoughtful surprises.",
    "Resolve conflicts": "I approach conflicts with empathy and find positive resolutions.",
    "Show gratitude": "I express heartfelt appreciation to those around me.",
    "Volunteer together": "My family and I make a positive impact in our community through volunteering.",
    "Visit new country": "I am open to new experiences and cultures as I explore the world.",
    "Solo trip": "I am confident and capable as I embark on enriching solo adventures.",
    "Bucket-list adventure": "I turn my travel dreams into reality, one adventure at a time.",
    "Unique accommodations": "I seek out and enjoy unique, memorable places to stay in my travels.",
    "Learn foreign language": "I am expanding my linguistic abilities, connecting with new cultures.",
    "Travel savings fund": "I am financially prepared for my next exciting travel adventure.",
    "Local exploration": "I discover the beauty and excitement in my own backyard.",
    "Family vacation": "I create lasting memories with my family through our travels together.",
    "Spontaneous travel": "I embrace spontaneity and new experiences in my travels.",
    "Cultural immersion": "I immerse myself in and learn from diverse cultures around the world."
  }

  return affirmations[goal] || `I am committed to achieving my goal of ${goal.toLowerCase()}.`
}

export function ManifestationApp() {
  const [step, setStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<Record<string, string[]>>({})
  const [customGoals, setCustomGoals] = useState<Record<string, string[]>>({})
  const [visionBoard, setVisionBoard] = useState<Record<string, string>>({})
  const [affirmations, setAffirmations] = useState<Record<string, string>>({})
  const [gratitude, setGratitude] = useState<Record<string, string>>({})
  const [limitingBeliefs, setLimitingBeliefs] = useState({
    fear: '',
    triggeringSituation: '',
    thoughts: '',
    firstExperience: '',
    pastExperiences: '',
    societalMessages: ''
  })
  const [planDuration, setPlanDuration] = useState('')

  const handleGoalSelection = (category: string, goal: string) => {
    setSelectedGoals(prev => {
      const updatedGoals = { ...prev }
      if (!updatedGoals[category]) {
        updatedGoals[category] = []
      }
      if (updatedGoals[category].includes(goal)) {
        updatedGoals[category] = updatedGoals[category].filter(g => g !== goal)
      } else if (updatedGoals[category].length < 3) {
        updatedGoals[category] = [...updatedGoals[category], goal]
      }
      return updatedGoals
    })
  }

  const handleCustomGoalAdd = (category: string) => {
    setCustomGoals(prev => {
      const updatedGoals = { ...prev }
      if (!updatedGoals[category]) {
        updatedGoals[category] = []
      }
      updatedGoals[category] = [...updatedGoals[category], '']
      return updatedGoals
    })
  }

  const handleCustomGoalChange = (category: string, index: number, value: string) => {
    setCustomGoals(prev => {
      const updatedGoals = { ...prev }
      updatedGoals[category][index] = value
      return updatedGoals
    })
  }

  const handleVisionBoardUpload = (category: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVisionBoard(prev => ({ ...prev, [category]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGratitudeChange = (category: string, value: string) => {
    setGratitude(prev => ({ ...prev, [category]: value }))
  }

  const handleLimitingBeliefChange = (field: string, value: string) => {
    setLimitingBeliefs(prev => ({ ...prev, [field]: value }))
  }

  const generateAffirmations = () => {
    const newAffirmations: Record<string, string> = {}
    Object.entries(selectedGoals).forEach(([category, goals]) => {
      goals.forEach(goal => {
        newAffirmations[goal] = generateAffirmation(goal)
      })
    })
    Object.entries(customGoals).forEach(([category, goals]) => {
      goals.forEach(goal => {
        if (goal.trim() !== '') {
          newAffirmations[goal] = generateAffirmation(goal)
        }
      })
    })
    setAffirmations(newAffirmations)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 1: Select Your Goals</h2>
            {goalCategories.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.options.map((goal, goalIndex) => (
                    <div key={goalIndex} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category.name}-${goalIndex}`}
                        checked={selectedGoals[category.name]?.includes(goal)}
                        onCheckedChange={() => handleGoalSelection(category.name, goal)}
                        disabled={selectedGoals[category.name]?.length >= 3 && !selectedGoals[category.name]?.includes(goal)}
                      />
                      <label
                        htmlFor={`${category.name}-${goalIndex}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-medium">Custom Goals</h4>
                  {customGoals[category.name]?.map((customGoal, index) => (
                    <Input
                      key={index}
                      value={customGoal}
                      onChange={(e) => handleCustomGoalChange(category.name, index, e.target.value)}
                      placeholder={`Enter custom goal for ${category.name}`}
                      className="max-w-md"
                    />
                  ))}
                  <Button
                    onClick={() => handleCustomGoalAdd(category.name)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Custom Goal
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 2: Create Your Vision Board</h2>
            {Object.entries(selectedGoals).map(([category, goals]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium">{goal}</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleVisionBoardUpload(goal, e)}
                        className="max-w-md"
                      />
                      {visionBoard[goal] && (
                        <img src={visionBoard[goal]} alt={goal} className="w-32 h-32 object-cover rounded-md" />
                      )}
                    </div>
                  ))}
                  {customGoals[category]?.map((customGoal, index) => (
                    <div key={`custom-${index}`} className="space-y-2">
                      <p className="font-medium">{customGoal}</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleVisionBoardUpload(customGoal, e)}
                        className="max-w-md"
                      />
                      {visionBoard[customGoal] && (
                        <img src={visionBoard[customGoal]} alt={customGoal} className="w-32 h-32 object-cover rounded-md" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 3: Affirmations</h2>
            <Button onClick={generateAffirmations} className="mb-4">Generate Affirmations</Button>
            {Object.entries(selectedGoals).map(([category, goals]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold">{category}</h3>
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="font-medium">{goal}</Label>
                    <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md">{affirmations[goal] || 'Click "Generate Affirmations" to see your affirmation.'}</p>
                  </div>
                ))}
                {customGoals[category]?.map((customGoal, index) => (
                  <div key={`custom-${index}`} className="space-y-2">
                    <Label className="font-medium">{customGoal}</Label>
                    <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md">{affirmations[customGoal] || 'Click "Generate Affirmations" to see your affirmation.'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 4: Gratitude</h2>
            {Object.entries(selectedGoals).map(([category, goals]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold">{category}</h3>
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`gratitude-${goal}`} className="font-medium">{goal}</Label>
                    <Textarea
                      id={`gratitude-${goal}`}
                      placeholder={`Express gratitude related to ${goal}`}
                      value={gratitude[goal] || ''}
                      onChange={(e) => handleGratitudeChange(goal, e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                ))}
                {customGoals[category]?.map((customGoal, index) => (
                  <div key={`custom-${index}`} className="space-y-2">
                    <Label htmlFor={`gratitude-${customGoal}`} className="font-medium">{customGoal}</Label>
                    <Textarea
                      id={`gratitude-${customGoal}`}
                      placeholder={`Express gratitude related to ${customGoal}`}
                      value={gratitude[customGoal] || ''}
                      onChange={(e) => handleGratitudeChange(customGoal, e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 5: Address Your Limiting Beliefs</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fear" className="font-medium">What specific fear do I have?</Label>
                <Input
                  id="fear"
                  placeholder="Example: I fear that I will fail at my new job."
                  value={limitingBeliefs.fear}
                  onChange={(e) => handleLimitingBeliefChange('fear', e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="triggeringSituation" className="font-medium">What situation triggers this fear?</Label>
                <Input
                  id="triggeringSituation"
                  placeholder="Example: When I have to present in front of my team."
                  value={limitingBeliefs.triggeringSituation}
                  onChange={(e) => handleLimitingBeliefChange('triggeringSituation', e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thoughts" className="font-medium">What thoughts go through my mind when I feel this fear?</Label>
                <Textarea
                  id="thoughts"
                  placeholder='Example: "I'm not good enough," or "What if they judge me?"'
                  value={limitingBeliefs.thoughts}
                  onChange={(e) => handleLimitingBeliefChange('thoughts', e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstExperience" className="font-medium">When did I first start feeling this way?</Label>
                <Input
                  id="firstExperience"
                  placeholder="Example: I felt this way after receiving criticism in school."
                  value={limitingBeliefs.firstExperience}
                  onChange={(e) => handleLimitingBeliefChange('firstExperience', e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pastExperiences" className="font-medium">What past experiences contribute to this fear?</Label>
                <Textarea
                  id="pastExperiences"
                  placeholder="Example: I remember struggling with public speaking in college."
                  value={limitingBeliefs.pastExperiences}
                  onChange={(e) => handleLimitingBeliefChange('pastExperiences', e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="societalMessages" className="font-medium">Are there any societal messages or beliefs that reinforce this fear?</Label>
                <Textarea
                  id="societalMessages"
                  placeholder="Example: Society often portrays failure as shameful."
                  value={limitingBeliefs.societalMessages}
                  onChange={(e) => handleLimitingBeliefChange('societalMessages', e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 6: Choose Your Daily Plan</h2>
            <RadioGroup value={planDuration} onValueChange={setPlanDuration}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10" id="r1" />
                <Label htmlFor="r1">10 Minutes Plan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20" id="r2" />
                <Label htmlFor="r2">20 Minutes Plan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="60" id="r3" />
                <Label htmlFor="r3">1 Hour Plan</Label>
              </div>
            </RadioGroup>
            {planDuration && (
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold">Your {planDuration} Minutes Plan:</h3>
                {planDuration === "10" && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Breathing - 1 minute</li>
                    <li>Silence - 3 minutes</li>
                    <li>Gratitude - 1 minute</li>
                    <li>Goals Vision Board/visualisation - 2 minutes</li>
                    <li>Affirmations - 2 minutes</li>
                    <li>Read your Life Script - 2 minutes</li>
                    <li>Ho'oponopono - 1 minute</li>
                  </ul>
                )}
                {planDuration === "20" && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Breathing - 1 minute</li>
                    <li>Silence - 3 minutes</li>
                    <li>Gratitude - 2 minutes</li>
                    <li>Goals Vision Board/visualisation - 4 minutes</li>
                    <li>Affirmations - 2 minutes</li>
                    <li>Read your Life Script - 5 minutes</li>
                    <li>Ho'oponopono - 3 minutes</li>
                  </ul>
                )}
                {planDuration === "60" && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Breathing - 10 minutes</li>
                    <li>Silence - 10 minutes</li>
                    <li>Gratitude - 3 minutes</li>
                    <li>Affirmations - 3 minutes</li>
                    <li>Goals Vision Board/visualisation - 5 minutes</li>
                    <li>Exercise - 5 minutes</li>
                    <li>Meditation - 7 minutes</li>
                    <li>Inner child healing + Ho'oponopono - 5 minutes</li>
                    <li>Address your Limiting Beliefs for the day - 5 minutes</li>
                    <li>Read/listen to your Life Script - 5 minutes</li>
                    <li>Reading + Scribing - 7 minutes</li>
                  </ul>
                )}
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-[800px] mx-auto">
      <CardHeader>
        <CardTitle>AI Goal Manifestor</CardTitle>
        <CardDescription>Manifest your dreams with AI-powered guidance</CardDescription>
      </CardHeader>
      <CardContent>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 0 && (
          <Button onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < 5 && (
          <Button onClick={() => setStep(step + 1)}>
            Next
          </Button>
        )}
        {step === 5 && (
          <Button onClick={() => console.log("Finish and generate plan")}>
            Finish
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}