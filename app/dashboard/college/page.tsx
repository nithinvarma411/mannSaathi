"use client";

import { useState } from "react";
import { TopNav } from "@/components/nav/top-nav";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Plus,
  Users,
  UserCheck,
  Calendar,
  Clock,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  Maximize2,
  Upload,
} from "lucide-react";
import { ProfileIcon } from "../../../components/profile/icon";
import { CounselorDetailsModal } from "@/components/dashboard/counselor-details-modal";
import Link from "next/link";

// Mock data for the dashboard
const overviewMetrics = {
  totalStudents: { value: 1242, delta: +5.2 },
  activeCounsellors: { value: 28, delta: +3.7 },
  sessionsConducted: { value: 86, delta: +12.4 },
  pendingRequests: { value: 12, delta: -15.8 },
};

// Enhanced counselor data with detailed information
const counsellorData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    location: "Psychology Building, Room 204",
    assignedStudents: 42,
    totalSessions: 156,
    status: "active",
    rating: 4.8,
    totalRatings: 89,
    joinDate: "2022-08-15",
    experience: "5 Years",
    bio: "Dr. Sarah Johnson is a licensed clinical psychologist specializing in anxiety disorders and academic stress management. She has been helping students navigate their mental health challenges for over 5 years.",
    specializations: [
      "Anxiety Disorders",
      "Academic Stress",
      "Cognitive Behavioral Therapy",
      "Mindfulness",
      "Crisis Intervention",
    ],
    avatar: "/counselor-avatar.png",
    students: [
      {
        id: "st-001",
        name: "Alex Thompson",
        anonymousId: "Anon-A4B2",
        totalSessions: 8,
        lastSession: "2024-09-20",
        status: "active",
        mood: 7,
        avatar: "/student-avatar.png",
      },
      {
        id: "st-002",
        name: "Jordan Kim",
        anonymousId: "Anon-K8L3",
        totalSessions: 12,
        lastSession: "2024-09-19",
        status: "active",
        mood: 6,
        avatar: "/diverse-user-avatars.png",
      },
      {
        id: "st-003",
        name: "Morgan Davis",
        anonymousId: "Anon-M2N4",
        totalSessions: 6,
        lastSession: "2024-09-18",
        status: "completed",
        mood: 8,
        avatar: "/minimal-avatar.png",
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 234-5678",
    location: "Student Wellness Center, Suite 301",
    assignedStudents: 38,
    totalSessions: 142,
    status: "active",
    rating: 4.6,
    totalRatings: 76,
    joinDate: "2021-09-01",
    experience: "7 Years",
    bio: "Dr. Michael Chen specializes in depression, relationship counseling, and multicultural psychology. He brings a culturally sensitive approach to mental health care.",
    specializations: [
      "Depression Therapy",
      "Relationship Counseling",
      "Multicultural Psychology",
      "Group Therapy",
      "Family Systems",
    ],
    avatar: "/counselor-headshot.png",
    students: [
      {
        id: "st-004",
        name: "Casey Wilson",
        anonymousId: "Anon-C8D3",
        totalSessions: 10,
        lastSession: "2024-09-21",
        status: "active",
        mood: 5,
        avatar: "/diverse-profile-avatars.png",
      },
      {
        id: "st-005",
        name: "Taylor Brown",
        anonymousId: "Anon-T5R6",
        totalSessions: 7,
        lastSession: "2024-09-17",
        status: "pending",
        mood: 6,
        avatar: "/placeholder-user.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Emma Rodriguez",
    email: "emma.rodriguez@university.edu",
    phone: "+1 (555) 345-6789",
    location: "Health Services, Building C, Floor 2",
    assignedStudents: 35,
    totalSessions: 189,
    status: "active",
    rating: 4.9,
    totalRatings: 94,
    joinDate: "2020-01-15",
    experience: "8 Years",
    bio: "Dr. Emma Rodriguez is a specialist in trauma therapy and eating disorders. She uses evidence-based approaches to help students overcome complex mental health challenges.",
    specializations: [
      "Trauma Therapy",
      "Eating Disorders",
      "EMDR",
      "Body Image Issues",
      "Self-Harm Prevention",
    ],
    avatar: "/therapist-portrait.png",
    students: [
      {
        id: "st-006",
        name: "River Martinez",
        anonymousId: "Anon-E6F1",
        totalSessions: 15,
        lastSession: "2024-09-22",
        status: "active",
        mood: 7,
        avatar: "/diverse-avatars.png",
      },
      {
        id: "st-007",
        name: "Sage Cooper",
        anonymousId: "Anon-S9G2",
        totalSessions: 9,
        lastSession: "2024-09-16",
        status: "active",
        mood: 8,
        avatar: "/anonymous-avatar.png",
      },
    ],
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    email: "james.wilson@university.edu",
    phone: "+1 (555) 456-7890",
    location: "Campus Counseling Center, Room 105",
    assignedStudents: 29,
    totalSessions: 98,
    status: "inactive",
    rating: 4.3,
    totalRatings: 52,
    joinDate: "2023-02-01",
    experience: "3 Years",
    bio: "Dr. James Wilson focuses on substance abuse counseling and addiction recovery. He provides compassionate care for students struggling with various forms of addiction.",
    specializations: [
      "Substance Abuse",
      "Addiction Recovery",
      "Motivational Interviewing",
      "Relapse Prevention",
      "12-Step Programs",
    ],
    avatar: "/counsellor-portrait.png",
    students: [
      {
        id: "st-008",
        name: "Quinn Foster",
        anonymousId: "Anon-Q3H7",
        totalSessions: 11,
        lastSession: "2024-09-10",
        status: "completed",
        mood: 6,
        avatar: "/student.png",
      },
    ],
  },
  {
    id: 5,
    name: "Dr. Olivia Parker",
    email: "olivia.parker@university.edu",
    phone: "+1 (555) 567-8901",
    location: "Mental Health Hub, Building A, Suite 210",
    assignedStudents: 31,
    totalSessions: 134,
    status: "active",
    rating: 4.7,
    totalRatings: 68,
    joinDate: "2022-01-10",
    experience: "6 Years",
    bio: "Dr. Olivia Parker specializes in LGBTQ+ affirming therapy and identity development. She creates a safe and inclusive space for all students to explore their mental health.",
    specializations: [
      "LGBTQ+ Affirming Therapy",
      "Identity Development",
      "Coming Out Support",
      "Gender Dysphoria",
      "Inclusive Counseling",
    ],
    avatar: "/counselor.png",
    students: [
      {
        id: "st-009",
        name: "Avery Johnson",
        anonymousId: "Anon-G9H4",
        totalSessions: 13,
        lastSession: "2024-09-21",
        status: "active",
        mood: 7,
        avatar: "/placeholder.jpg",
      },
      {
        id: "st-010",
        name: "Blake Lee",
        anonymousId: "Anon-B1L5",
        totalSessions: 5,
        lastSession: "2024-09-19",
        status: "pending",
        mood: 5,
        avatar: "/university.png",
      },
    ],
  },
];

const moodTrendData = [
  { date: "Jan", mood: 6.2 },
  { date: "Feb", mood: 6.5 },
  { date: "Mar", mood: 6.8 },
  { date: "Apr", mood: 7.1 },
  { date: "May", mood: 6.9 },
  { date: "Jun", mood: 7.3 },
  { date: "Jul", mood: 7.0 },
  { date: "Aug", mood: 7.2 },
  { date: "Sep", mood: 7.4 },
];

const stressData = [
  { name: "Academic Pressure", value: 35 },
  { name: "Relationship Issues", value: 25 },
  { name: "Financial Stress", value: 20 },
  { name: "Career Anxiety", value: 15 },
  { name: "Other", value: 5 },
];

const urgentCases = [
  {
    id: "ST-1001",
    student: "Anon-A4B2",
    lastActivity: "2 hours ago",
    status: "High",
  },
  {
    id: "ST-1002",
    student: "Anon-C8D3",
    lastActivity: "5 hours ago",
    status: "High",
  },
  {
    id: "ST-1003",
    student: "Anon-E6F1",
    lastActivity: "1 day ago",
    status: "Medium",
  },
  {
    id: "ST-1004",
    student: "Anon-G9H4",
    lastActivity: "1 day ago",
    status: "Medium",
  },
];

const feedbackSnippets = [
  {
    id: 1,
    text: "The counsellor helped me understand my anxiety triggers better.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    text: "Great resources for managing exam stress. Very helpful!",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    text: "The mindfulness sessions have been a game-changer for my daily routine.",
    timestamp: "1 day ago",
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    active: "bg-green-500/20 text-green-400",
    inactive: "bg-gray-500/20 text-gray-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400",
    medium: "bg-orange-500/20 text-orange-400",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status.toLowerCase() as keyof typeof statusStyles] || "bg-gray-500/20 text-gray-400"}`}
    >
      {status}
    </span>
  );
}

// Metrics card component
function MetricsCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-4 sm:p-5 transition-all hover:bg-white/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-slate-500">{title}</p>
          <p className="text-xl sm:text-2xl font-semibold text-[#E5E7EB] mt-1">
            {value}
          </p>
        </div>
        <div
          className="rounded-lg p-2 sm:p-3"
          style={{ backgroundColor: `${color}20` }}
        >
          <div style={{ color: color }}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="font-bold text-slate-100">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-slate-300">
            {entry.name}: {entry.value}
            {entry.name === "mood" ? "" : "%"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CollegeDashboardPage() {
  const COLORS = ["#60A5FA", "#22D3EE", "#34D399", "#FBBF24", "#F87171"];
  const [isStressModalOpen, setIsStressModalOpen] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [isCounselorModalOpen, setIsCounselorModalOpen] = useState(false);

  const handleViewCounselorDetails = (counselor: any) => {
    setSelectedCounselor(counselor);
    setIsCounselorModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black pt-6 sm:pt-8">
      {/* White Spotlight Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.04) 20%,
              rgba(0, 0, 0, 0.0) 60%
            )
          `,
        }}
      />

      <TopNav />
      <div className="px-4 sm:px-4 min-h-screen pl-2 sm:pl-16 relative z-10">
        <div className="mx-auto max-w-7xl pb-8 sm:pb-12">
          {/* Dashboard Header */}
          <div className="mt-16 sm:mt-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mr-20">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">
                College Dashboard
              </h1>
              <p className="text-slate-500 mt-1 text-sm sm:text-base">
                Mental health analytics and management
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
               <div className="hidden lg:block absolute right-5 top-5 ">
                <ProfileIcon />
                </div>
            </div>
          </div>

          {/* Data Upload Link */}
          <div className="mt-3 sm:mt-4">
            <Link href="/data">
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-3 sm:p-4 transition-all hover:bg-white/7 hover:-translate-y-0.5 cursor-pointer">
                <div className="flex items-center">
                  <div className="rounded-lg bg-[#22D3EE]/20 p-2 sm:p-3">
                    <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-[#22D3EE]" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="font-medium text-slate-100 text-sm sm:text-base">Upload Your Students Data</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Import students and counselors from CSV files</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Overview Metrics Grid */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <MetricsCard
              title="Total Students"
              value={overviewMetrics.totalStudents.value.toLocaleString()}
              icon={Users}
              color="#60A5FA"
            />
            <MetricsCard
              title="Active Counsellors"
              value={overviewMetrics.activeCounsellors.value}
              icon={UserCheck}
              color="#22D3EE"
            />
            <MetricsCard
              title="Sessions Conducted"
              value={overviewMetrics.sessionsConducted.value}
              icon={Calendar}
              color="#34D399"
            />
            <MetricsCard
              title="Pending Requests"
              value={overviewMetrics.pendingRequests.value}
              icon={Clock}
              color="#FBBF24"
            />
          </div>

          {/* Main Content Grid */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Counsellor Management */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                    Counsellor Management
                  </h2>
                  <Button className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] hover:opacity-90 text-slate-900 text-xs sm:text-sm w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Counsellor
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20 hover:bg-transparent">
                        <TableHead className="text-slate-300">Name</TableHead>
                        <TableHead className="text-slate-300">
                          Students
                        </TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Rating</TableHead>
                        <TableHead className="text-right text-slate-300">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {counsellorData.map((counsellor) => (
                        <TableRow
                          key={counsellor.id}
                          className="border-white/20 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-[#E5E7EB]">
                            {counsellor.name}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {counsellor.assignedStudents}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={counsellor.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-slate-300">
                                {counsellor.rating}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1 sm:gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full border-white/20 bg-white/5 text-slate-300 hover:bg-white/10 p-1 sm:p-2"
                                onClick={() =>
                                  handleViewCounselorDetails(counsellor)
                                }
                              >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 p-1 sm:p-2"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 p-1 sm:p-2"
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Recent Feedback */}
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6">
                  Recent Student Feedback
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {feedbackSnippets.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="rounded-lg sm:rounded-xl border border-white/20 bg-white/5 p-3 sm:p-4"
                    >
                      <p className="text-slate-300 text-sm sm:text-base">
                        {feedback.text}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {feedback.timestamp}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <Button className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] hover:opacity-90 text-slate-900 text-xs sm:text-sm w-full sm:w-auto">
                    Schedule Awareness Session
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/20 bg-white/5 text-slate-100 hover:bg-white/10 text-xs sm:text-sm w-full sm:w-auto"
                  >
                    Assign Counsellor
                  </Button>
                </div>
              </div>
            </div>

            {/* Student Trends & Reports */}
            <div className="space-y-4 sm:space-y-6">
              {/* Mood Trends */}
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6">
                  Mood Trends
                </h2>
                <div className="h-60 sm:h-72 no-focus-outline">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB20" />
                      <XAxis
                        dataKey="date"
                        stroke="#E5E7EB80"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        stroke="#E5E7EB80"
                        domain={[5, 8]}
                        tick={{ fontSize: 12 }}
                        tickCount={4}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: "#E5E7EB20", strokeWidth: 1 }}
                        wrapperStyle={{ outline: "none" }}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        dot={{
                          stroke: "#60A5FA",
                          strokeWidth: 2,
                          r: 4,
                          fill: "#0B1220",
                        }}
                        activeDot={{ r: 6, fill: "#60A5FA" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stress Indicators */}
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                    Common Stress Indicators
                  </h2>
                  <Dialog
                    open={isStressModalOpen}
                    onOpenChange={setIsStressModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-white/20 bg-white/5 text-slate-100 hover:bg-white/10 p-2"
                      >
                        <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[90vw] lg:max-w-[90vw] xl:max-w-[90vw] max-h-[90vh] h-auto sm:h-[90vh] overflow-y-auto bg-slate-900 border-white/10 p-0 [&>div]:max-w-none">
                      <DialogHeader className="p-4 sm:p-6 pb-0">
                        <DialogTitle className="text-slate-100 text-lg sm:text-xl">
                          Detailed Stress Indicators
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 text-sm sm:text-base">
                          Comprehensive breakdown of common stress factors among
                          students
                        </DialogDescription>
                      </DialogHeader>
                      <div className="h-[40vh] sm:h-[50vh] p-4 sm:p-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={stressData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={150}
                              innerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name}: ${(Number(percent || 0) * 100).toFixed(0)}%`
                              }
                              paddingAngle={2}
                            >
                              {stressData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              content={<CustomTooltip />}
                              cursor={{ stroke: "#E5E7EB20", strokeWidth: 1 }}
                              wrapperStyle={{ outline: "none" }}
                              isAnimationActive={false}
                            />
                            <Legend
                              layout="vertical"
                              verticalAlign="middle"
                              align="right"
                              wrapperStyle={{ paddingLeft: "20px" }}
                              content={(props) => {
                                const { payload } = props;
                                return (
                                  <ul
                                    className="flex flex-col gap-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    {payload &&
                                      payload.map((entry, index) => (
                                        <li
                                          key={`item-${index}`}
                                          className="flex items-center text-base"
                                        >
                                          <span
                                            className="inline-block w-4 h-4 rounded-full mr-3"
                                            style={{
                                              backgroundColor: entry.color,
                                            }}
                                          ></span>
                                          <span className="text-slate-100">
                                            {entry.value}
                                          </span>
                                        </li>
                                      ))}
                                  </ul>
                                );
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="p-4 sm:p-6 pt-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3 sm:mb-4">
                          Detailed Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-5">
                            <h4 className="font-medium text-slate-100 mb-2 text-sm sm:text-base">
                              Academic Pressure (35%)
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300">
                              Highest stress factor among students. Contributing
                              factors include exam pressure, assignment
                              deadlines, and academic competition.
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-5">
                            <h4 className="font-medium text-slate-100 mb-2 text-sm sm:text-base">
                              Relationship Issues (25%)
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300">
                              Significant portion of students experience stress
                              from personal relationships, including family,
                              friends, and romantic partners.
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-5">
                            <h4 className="font-medium text-slate-100 mb-2 text-sm sm:text-base">
                              Financial Stress (20%)
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300">
                              Financial concerns related to tuition, living
                              expenses, and future career prospects contribute
                              to student stress.
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/5 p-3 sm:p-5">
                            <h4 className="font-medium text-slate-100 mb-2 text-sm sm:text-base">
                              Career Anxiety (15%)
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300">
                              Uncertainty about future career paths and job
                              market competitiveness creates anxiety among
                              students.
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stressData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={70}
                        innerRadius={30}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {stressData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: "#E5E7EB20", strokeWidth: 1 }}
                        wrapperStyle={{ outline: "none" }}
                        isAnimationActive={false}
                      />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: "20px" }}
                        content={(props) => {
                          const { payload } = props;
                          return (
                            <div className="flex flex-wrap justify-center gap-3 pt-4">
                              {payload &&
                                payload.map((entry, index) => (
                                  <div
                                    key={`item-${index}`}
                                    className="flex items-center text-sm"
                                  >
                                    <span
                                      className="inline-block w-3 h-3 rounded-full mr-2"
                                      style={{ backgroundColor: entry.color }}
                                    ></span>
                                    <span className="text-slate-300">
                                      {entry.value}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Urgent Cases */}
              <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-black p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                    Urgent Cases
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/20 bg-white/5 text-slate-100 hover:bg-white/10 text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20 hover:bg-transparent">
                        <TableHead className="text-slate-300">
                          Student
                        </TableHead>
                        <TableHead className="text-slate-300">
                          Last Activity
                        </TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {urgentCases.map((caseItem) => (
                        <TableRow
                          key={caseItem.id}
                          className="border-white/20 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-[#E5E7EB]">
                            {caseItem.student}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {caseItem.lastActivity}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={caseItem.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counselor Details Modal */}
      <CounselorDetailsModal
        counselor={selectedCounselor}
        isOpen={isCounselorModalOpen}
        onClose={() => setIsCounselorModalOpen(false)}
      />
    </main>
  );
}
