import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

function App() {
  const [progressValue, setProgressValue] = useState(45)

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-svh bg-background">
        {/* Header Section */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Shadcn/UI Showcase</h1>
              <Badge variant="secondary">Complex UI Demo</Badge>
            </div>
            <ModeToggle />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Welcome Alert */}
          <Alert>
            <AlertDescription>
              Welcome to our enhanced home page showcasing multiple shadcn/ui components in action!
            </AlertDescription>
          </Alert>

          {/* Main Content Tabs */}
          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Cards Tab */}
            <TabsContent value="cards" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Card</CardTitle>
                    <CardDescription>Basic card with title and description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is a basic feature card showcasing the Card component from shadcn/ui.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Hover for details
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">@hovercard</h4>
                      <p className="text-sm">This is a hover card component that appears when you hover over the trigger element.</p>
                      <div className="flex items-center pt-2">
                        <Badge variant="secondary" className="mr-2">UI Component</Badge>
                        <span className="text-xs text-muted-foreground">Interactive</span>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Progress Card
                      <Badge>New</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Task Progress</span>
                        <span className="text-sm text-muted-foreground">{progressValue}%</span>
                      </div>
                      <Progress value={progressValue} className="w-full" />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                      >
                        -10%
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                      >
                        +10%
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Interactive Tab */}
            <TabsContent value="interactive" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Accordion */}
                <Card>
                  <CardHeader>
                    <CardTitle>FAQ Section</CardTitle>
                    <CardDescription>Accordion component for collapsible content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
                        <AccordionContent>
                          shadcn/ui is a collection of re-usable components built with Radix UI and Tailwind CSS.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I use these components?</AccordionTrigger>
                        <AccordionContent>
                          You can copy and paste the components into your project and customize them as needed.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Are these components accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes, all components are built with accessibility in mind using Radix UI primitives.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Dialog */}
                <Card>
                  <CardHeader>
                    <CardTitle>Modal Dialog</CardTitle>
                    <CardDescription>Interactive dialog component</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">Open Dialog</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Confirm Action</DialogTitle>
                          <DialogDescription>
                            This is a modal dialog example. All components are interactive and customizable.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p>Click confirm to proceed with your action.</p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Separator />

                    {/* Sheet */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">Open Sheet</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Sheet Panel</SheetTitle>
                          <SheetDescription>
                            This is a side panel that slides in from the edge of the screen.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6">
                          <p>You can put any content here in this sheet component.</p>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scroll Area */}
                <Card>
                  <CardHeader>
                    <CardTitle>Scrollable Content</CardTitle>
                    <CardDescription>ScrollArea component for custom scrollbars</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48 w-full rounded border p-4">
                      <div className="space-y-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                List item {i + 1}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                This is some additional content for demonstration.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Tooltip Examples */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Elements</CardTitle>
                    <CardDescription>Tooltips and hover effects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Hover for tooltip</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is a tooltip with additional information</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Info</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>More info about this feature</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline">Help</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click for help documentation</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Status Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complex Interactive Dashboard</CardTitle>
                    <CardDescription>Combining multiple components for advanced functionality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Progress with Tooltip */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Dashboard Progress</span>
                          <Badge variant="secondary">{progressValue}%</Badge>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-full">
                                <Progress value={progressValue} className="w-full" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Current completion: {progressValue}%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Separator />

                      {/* Interactive Actions */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProgressValue(25)}
                        >
                          25%
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProgressValue(50)}
                        >
                          50%
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProgressValue(75)}
                        >
                          75%
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProgressValue(100)}
                        >
                          100%
                        </Button>
                      </div>

                      <Separator />

                      {/* Status Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Features</h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Components</span>
                              <Badge variant="outline" className="text-xs">15+</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Interactive</span>
                              <Badge variant="outline" className="text-xs">Yes</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Responsive</span>
                              <Badge variant="outline" className="text-xs">Full</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Status</h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Theme</span>
                              <Badge variant="secondary" className="text-xs">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Mode</span>
                              <Badge variant="outline" className="text-xs">System</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Accessibility</span>
                              <Badge variant="outline" className="text-xs">WCAG</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Actions</h4>
                          <div className="space-y-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full">
                                  Configure
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Configuration</DialogTitle>
                                  <DialogDescription>
                                    Configure your dashboard settings here.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>Settings panel would go here.</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" className="w-full">
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="border-t pt-8">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                This page demonstrates the power and flexibility of shadcn/ui components
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">Radix UI</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
