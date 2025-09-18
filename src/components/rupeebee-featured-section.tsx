'use client'

import { Activity, Users, Shield, BookOpen, Globe as GlobeIcon, Send, MapPin } from 'lucide-react'
import DottedMap from 'dotted-map'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function RupeeBeeFeaturedSection() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    partnershipType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="whats-next" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What&apos;s Next for RupeeBee?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from the SAFE Hackathon 2025, RupeeBee is a movement towards financial literacy for all. 
            Join us in building a financially aware and secure society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
          {/* 1. Global Impact Map - Top Left */}
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <MapPin className="w-4 h-4" />
              Global Financial Literacy Impact
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Expanding worldwide to create{" "}
              <span className="text-green-600">fraud-aware communities</span>
            </h3>

            <div className="relative mt-4">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white text-green-600 rounded-md text-xs font-medium shadow flex items-center gap-2">
                🌍 Protecting users globally
              </div>
              <GlobalMap />
            </div>
          </div>

          {/* 2. Partnership Contact Form - Top Right */}
          <div className="flex flex-col justify-between gap-4 p-6 rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <div>
              <span className="text-xs flex items-center gap-2 text-gray-500 mb-2">
                <Send className="w-4 h-4" /> Partnership & Collaboration
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Partner with us to{" "}
                <span className="text-blue-600">build the future of fintech</span>
              </h3>
            </div>
            <PartnershipForm 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>

          {/* 3. Growth Analytics - Bottom Left */}
          <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Activity className="w-4 h-4" />
              RupeeBee Analytics
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Real-time fraud prevention tracking.{" "}
              <span className="text-orange-600">Protecting millions daily.</span>
            </h3>
            <GrowthChart />
          </div>

          {/* 4. Vision Cards - Bottom Right */}
          <div className="grid sm:grid-cols-2 rounded-lg bg-white">
            <VisionCard
              icon={<BookOpen className="w-4 h-4" />}
              title="Educational Integration"
              subtitle="Next Generation"
              description="Partner with schools to integrate financial literacy into curricula for students."
              color="from-blue-500 to-purple-500"
            />
            <VisionCard
              icon={<Shield className="w-4 h-4" />}
              title="AI Fraud Detection"
              subtitle="Advanced Protection"
              description="Develop AI systems that predict and prevent fraud in real-time globally."
              color="from-red-500 to-pink-500"
            />
            <VisionCard
              icon={<Users className="w-4 h-4" />}
              title="Community Outreach"
              subtitle="Local Impact"
              description="Establish community centers for hands-on financial education."
              color="from-green-500 to-teal-500"
            />
            <VisionCard
              icon={<GlobeIcon className="w-4 h-4" />}
              title="Open Source Platform"
              subtitle="Global Collaboration"
              description="Make RupeeBee's technology open source for worldwide adaptation."
              color="from-yellow-500 to-orange-500"
            />
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Roadmap</h3>
          <div className="space-y-6">
            <TimelineItem
              number="1"
              year="2025"
              title="Foundation & Growth"
              description="Complete SAFE Hackathon, gather user feedback, and establish partnerships with financial institutions across India."
              color="bg-green-600"
            />
            <TimelineItem
              number="2"
              year="2026"
              title="Regional Expansion"
              description="Expand to South Asian countries, localize content for different languages and financial systems."
              color="bg-green-500"
            />
            <TimelineItem
              number="3"
              year="2027"
              title="Global Initiative"
              description="Launch open-source platform and establish international consortium for financial literacy."
              color="bg-green-400"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------- Vision Card Component -------------------
function VisionCard({ 
  icon, 
  title, 
  subtitle, 
  description, 
  color 
}: { 
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  color: string
}) {
  return (
    <div className="relative flex flex-col gap-3 p-4 border border-gray-200 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs flex items-center gap-2 text-gray-500 mb-2">
            {icon}
            {title}
          </span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {subtitle}
          </h3>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {/* Gradient indicator */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${color} rounded-b`} />
    </div>
  )
}

// ----------------- Partnership Form Component -------------------
function PartnershipForm({ 
  formData, 
  handleChange, 
  handleSubmit 
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Input
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="text-sm h-9"
          required
        />
        <Input
          name="organization"
          placeholder="Organization"
          value={formData.organization}
          onChange={handleChange}
          className="text-sm h-9"
          required
        />
      </div>
      <Input
        name="email"
        type="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
        className="text-sm h-9"
        required
      />
      <select
        name="partnershipType"
        value={formData.partnershipType}
        onChange={handleChange}
        className="w-full h-9 px-3 rounded-md border border-gray-300 text-sm"
        required
      >
        <option value="">Partnership type</option>
        <option value="corporate">Corporate Partnership</option>
        <option value="investment">Investment Opportunity</option>
        <option value="technology">Technology Integration</option>
        <option value="strategic">Strategic Alliance</option>
      </select>
      <textarea
        name="message"
        placeholder="Tell us about your partnership vision..."
        value={formData.message}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm resize-none"
        required
      />
      <button
        type="submit"
        className="w-full h-9 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-3 h-3" />
        Send Message
      </button>
    </form>
  )
}

// ----------------- Timeline Item Component -------------------
function TimelineItem({
  number,
  year,
  title,
  description,
  color
}: {
  number: string
  year: string
  title: string
  description: string
  color: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm`}>
        {number}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-1">{year}: {title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

// ----------------- Global Map -------------------
const map = new DottedMap({ height: 40, grid: 'diagonal' })
const points = map.getPoints()

const GlobalMap = () => (
  <svg viewBox="0 0 100 40" className="w-full h-auto text-green-500/70">
    {points.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={0.12} fill="currentColor" />
    ))}
  </svg>
)

// ----------------- Growth Chart -------------------
const chartData = [
  { month: 'Jan', users: 156, fraud_prevented: 24 },
  { month: 'Feb', users: 290, fraud_prevented: 45 },
  { month: 'Mar', users: 426, fraud_prevented: 78 },
  { month: 'Apr', users: 605, fraud_prevented: 123 },
  { month: 'May', users: 890, fraud_prevented: 210 },
  { month: 'Jun', users: 1200, fraud_prevented: 350 },
]

const chartConfig = {
  users: {
    label: 'Protected Users',
    color: '#f59e0b',
  },
  fraud_prevented: {
    label: 'Fraud Cases Prevented',
    color: '#ef4444',
  },
} satisfies ChartConfig

function GrowthChart() {
  return (
    <ChartContainer className="h-48 aspect-auto" config={chartConfig}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-users)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-users)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillFraudPrevented" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-fraud_prevented)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-fraud_prevented)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis hide />
        <YAxis hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="dark:bg-muted" />} />
        <Area strokeWidth={2} dataKey="fraud_prevented" type="monotone" fill="url(#fillFraudPrevented)" stroke="var(--color-fraud_prevented)" />
        <Area strokeWidth={2} dataKey="users" type="monotone" fill="url(#fillUsers)" stroke="var(--color-users)" />
      </AreaChart>
    </ChartContainer>
  )
}

// Chart components from the original file
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartTooltip = RechartsPrimitive.Tooltip as React.FC<RechartsPrimitive.TooltipProps<any, any>>

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: Array<any>
    label?: React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labelFormatter?: (label: any, payload: Array<any>) => React.ReactNode
    labelClassName?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter?: (value: any, name: any, item: any, index: number, payload: any) => React.ReactNode
    color?: string
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & React.ComponentProps<"div">
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltip"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadObj = payload as Record<string, unknown>
  
  const payloadPayload =
    "payload" in payloadObj &&
    typeof payloadObj.payload === "object" &&
    payloadObj.payload !== null
      ? payloadObj.payload as Record<string, unknown>
      : undefined

  let configLabelKey: string = key

  if (
    key in payloadObj &&
    typeof payloadObj[key] === "string"
  ) {
    configLabelKey = payloadObj[key] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key] as unknown as (typeof config)[keyof typeof config] | undefined
}