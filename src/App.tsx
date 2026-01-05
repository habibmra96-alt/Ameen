import React, { useState, useEffect, useMemo } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Car,
  Tag,
  Calendar,
  Gauge,
  Sliders,
  Droplets,
  Disc,
  Camera,
  Clipboard,
  Zap,
  Armchair,
  Activity,
  ChevronDown,
  ChevronUp,
  Plus,
  Home,
  Trash2,
  Clock,
  AlertTriangle,
  User,
  Phone,
  Mail,
  Save,
  Edit,
  Loader2,
  LogOut,
  Lock,
  X,
  FileText,
  Star,
} from "lucide-react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image as PdfImage,
  Font,
} from "@react-pdf/renderer";
import "./styles.css";

// 0. SUPABASE CONFIGURATION

const SUPABASE_URL = "https://hubynmmrssnkvabovrfv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YnlubW1yc3Nua3ZhYm92cmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNDkxOTAsImV4cCI6MjA4MDYyNTE5MH0.U5p2SHMXjXTlKIiA5UJDN6D-FhZxwvzmnxRsVntpNhI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. CONFIGURATION AND TYPES

try {
  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
        fontWeight: 400,
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
        fontWeight: 700,
      },
    ],
  });
} catch (e) {
  console.error("Font registration failed", e);
}

const INSPECTION_CATEGORIES: any = {
  mechanical: {
    title: "Under The Hood",
    icon: Droplets,
    items: [
      "Engine Oil Condition",
      "Coolant Condition",
      "Transmission Fluid",
      "Valve Cover Gasket",
      "Radiator & Hoses",
      "Drive Belts",
      "Engine Mounts",
      "Battery Health",
    ],
  },
  suspension: {
    title: "Suspension & Steering",
    icon: Activity,
    items: [
      "Shock Absorbers",
      "Control Arms",
      "Ball Joints",
      "Axle Boots",
      "Steering Rack",
      "Differential",
      "Chassis Rust",
    ],
  },
  brakes: {
    title: "Brakes System",
    icon: Disc,
    items: [
      "Front Brake Pads",
      "Front Discs",
      "Rear Brake Pads",
      "Rear Discs",
      "Handbrake",
      "ABS Sensors",
    ],
  },
  electrical: {
    title: "Electrical & AC",
    icon: Zap,
    items: [
      "AC Cooling",
      "Compressor",
      "Windows",
      "Sunroof",
      "Central Locking",
      "Instrument Cluster",
      "Infotainment",
      "Headlights",
    ],
  },
  interior: {
    title: "Interior Cabin",
    icon: Armchair,
    items: [
      "Seat Upholstery",
      "Dashboard",
      "Roof Lining",
      "Carpets",
      "Door Panels",
      "Seatbelts",
    ],
  },
  chassis: {
    title: "Structural Integrity",
    icon: ShieldCheck,
    items: [
      "Frame Rails",
      "Aprons",
      "Radiator Support",
      "Pillars (A, B, C)",
      "Floor Pan",
      "Trunk Floor",
    ],
  },
};

// 2. PREMIUM PDF DESIGN

const pdfColors = {
  black: "#000000",
  neon: "#DFFF06",
  darkGrey: "#1F2937",
  lightGrey: "#F9FAFB",
  white: "#FFFFFF",
  border: "#E5E7EB",
  pass: "#10B981",
  fail: "#EF4444",
  na: "#9CA3AF",
};

const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: pdfColors.white,
    fontFamily: "Roboto",
    fontSize: 10,
    paddingBottom: 50,
    paddingTop: 50,
  },
  heroSection: {
    backgroundColor: pdfColors.black,
    padding: 40,
    paddingBottom: 70,
    marginTop: -50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoImage: { width: 140, height: "auto" },
  headerRight: { alignItems: "flex-end" },
  headerTitle: {
    color: pdfColors.white,
    fontSize: 22,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  headerDate: {
    color: pdfColors.neon,
    fontSize: 10,
    marginTop: 6,
    fontWeight: 400,
  },
  summaryCard: {
    marginHorizontal: 30,
    marginTop: -40,
    backgroundColor: pdfColors.white,
    borderRadius: 8,
    padding: 25,
    borderWidth: 1,
    borderColor: pdfColors.border,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.border,
    paddingBottom: 15,
    marginBottom: 15,
  },
  vehicleTitle: { fontSize: 20, fontWeight: 700, color: pdfColors.black },
  vinText: { fontSize: 9, color: "#6B7280", marginTop: 4 },
  scoreBadge: { flexDirection: "row", alignItems: "center" },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: pdfColors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: { color: pdfColors.neon, fontSize: 18, fontWeight: 700 },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  gridItem: { width: "33%", marginBottom: 12 },
  gridLabel: {
    fontSize: 7,
    color: "#9CA3AF",
    textTransform: "uppercase",
    marginBottom: 3,
    fontWeight: 700,
  },
  gridValue: { fontSize: 10, color: pdfColors.black, fontWeight: 400 },
  section: { marginHorizontal: 30, marginTop: 25 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: pdfColors.black,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 4,
  },
  sectionTitle: {
    color: pdfColors.white,
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  checkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  checkRow: {
    width: "48%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: pdfColors.lightGrey,
  },
  checkLabel: { fontSize: 9, color: "#374151", width: "70%", lineHeight: 1.3 },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 40,
    alignItems: "center",
  },
  pillText: {
    fontSize: 6,
    fontWeight: 700,
    textTransform: "uppercase",
    color: pdfColors.white,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 2,
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: pdfColors.border,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 7, color: "#9CA3AF" },
  noteBox: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: pdfColors.border,
  },
  noteText: { fontSize: 8, color: "#B45309", fontStyle: "italic" },
});

// animations for framer motion

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const pageVariants = {
  initial: { opacity: 0, x: 12 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -12 },
};

const pageTransition = {
  type: "tween" as const,
  duration: 0.25,
};

// helper to normalize data before sending to PDF

const normalizeReportForPdf = (input: any) => {
  const vehicle = input.vehicle || {};
  const customer = input.customer || {};
  const stats = input.stats || { pass: 0, fail: 0, score: 0 };
  const tires = input.tires || {
    fr: { brand: "", date: "", cond: "pass" },
    fl: { brand: "", date: "", cond: "pass" },
    rr: { brand: "", date: "", cond: "pass" },
    rl: { brand: "", date: "", cond: "pass" },
  };
  const detailedChecks = input.detailedChecks || {};
  const bodyWork = input.bodyWork || {};
  const summary = input.summary || "";
  const date =
    input.date ||
    input.created_at ||
    input.createdAt ||
    new Date().toISOString();

  return {
    data: detailedChecks,
    stats,
    vehicle,
    tires,
    bodyWork,
    summary,
    customer,
    date,
  };
};

const StatusPill = ({ status }: { status: string }) => {
  let bg = pdfColors.pass;
  if (
    status === "fail" ||
    status === "accident" ||
    status === "scratch" ||
    status === "paint"
  )
    bg = pdfColors.fail;
  if (status === "na") bg = pdfColors.na;
  return (
    <View style={[pdfStyles.pill, { backgroundColor: bg }]}>
      <Text style={pdfStyles.pillText}>{status}</Text>
    </View>
  );
};

const ReportDocument = ({
  data = {},
  stats = { pass: 0, fail: 0, score: 0 },
  vehicle = {},
  tires = {},
  bodyWork = {},
  summary = "",
  customer = {},
  date,
}: any) => {
  const logoUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/ameen-logo.png"
      : "/ameen-logo.png";

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.heroSection}>
          <PdfImage src={logoUrl} style={pdfStyles.logoImage} />
          <View style={pdfStyles.headerRight}>
            <Text style={pdfStyles.headerTitle}>Inspection Report</Text>
            <Text style={pdfStyles.headerDate}>
              {new Date(date || Date.now()).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={pdfStyles.summaryCard}>
          <View style={pdfStyles.summaryHeader}>
            <View>
              <Text style={pdfStyles.vehicleTitle}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </Text>
              <View>
                <Text style={pdfStyles.vinText}>
                  VIN: {vehicle.vin || "N/A"}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={pdfStyles.scoreBadge}>
                <View style={pdfStyles.scoreCircle}>
                  <Text style={pdfStyles.scoreValue}>{stats.score}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 8, color: "#6B7280", marginTop: 4 }}>
                SCORE
              </Text>
            </View>
          </View>
          <View style={pdfStyles.grid}>
            <View style={pdfStyles.gridItem}>
              <Text style={pdfStyles.gridLabel}>Odometer</Text>
              <Text style={pdfStyles.gridValue}>{vehicle.odo || "N/A"} KM</Text>
            </View>
            <View style={pdfStyles.gridItem}>
              <Text style={pdfStyles.gridLabel}>Trim</Text>
              <Text style={pdfStyles.gridValue}>
                {vehicle.trim || "Standard"}
              </Text>
            </View>
            <View style={pdfStyles.gridItem}>
              <Text style={pdfStyles.gridLabel}>Issues</Text>
              <Text style={[pdfStyles.gridValue, { color: pdfColors.fail }]}>
                {stats.fail}
              </Text>
            </View>
            {customer?.name && (
              <View style={pdfStyles.gridItem}>
                <Text style={pdfStyles.gridLabel}>Customer</Text>
                <Text style={pdfStyles.gridValue}>{customer.name}</Text>
              </View>
            )}
            {customer?.mobile && (
              <View style={pdfStyles.gridItem}>
                <Text style={pdfStyles.gridLabel}>Mobile</Text>
                <Text style={pdfStyles.gridValue}>{customer.mobile}</Text>
              </View>
            )}
          </View>
        </View>
        {summary ? (
          <View
            style={{
              marginHorizontal: 30,
              marginBottom: 20,
              padding: 15,
              backgroundColor: "#FDFDEA",
              borderLeftWidth: 3,
              borderLeftColor: pdfColors.neon,
            }}
            wrap={false}
          >
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Helvetica-Bold",
                marginBottom: 4,
                textTransform: "uppercase",
              }}
            >
              Inspector Notes
            </Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4 }}>{summary}</Text>
          </View>
        ) : null}
        {Object.values(INSPECTION_CATEGORIES).map(
          (category: any, index: number) => (
            <View key={index} style={pdfStyles.section} wrap={false}>
              <View style={pdfStyles.sectionHeader}>
                <Text style={pdfStyles.sectionTitle}>{category.title}</Text>
              </View>
              <View style={pdfStyles.checkGrid}>
                {category.items.map((itemKey: string) => {
                  const itemData = (data as any)[itemKey];
                  if (!itemData) return null;
                  return (
                    <View key={itemKey} style={pdfStyles.checkRow}>
                      <View style={{ flex: 1, paddingRight: 5 }}>
                        <Text style={pdfStyles.checkLabel}>{itemKey}</Text>
                        {itemData.photo && (
                          <PdfImage
                            src={itemData.photo}
                            style={pdfStyles.itemImage}
                          />
                        )}
                        {itemData.comment ? (
                          <View style={pdfStyles.noteBox}>
                            <Text style={pdfStyles.noteText}>
                              {itemData.comment}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                      <StatusPill status={itemData.status} />
                    </View>
                  );
                })}
              </View>
            </View>
          )
        )}
        <View style={pdfStyles.section} wrap={false}>
          <View style={pdfStyles.sectionHeader}>
            <Text style={pdfStyles.sectionTitle}>Exterior & Tires</Text>
          </View>
          <View style={pdfStyles.checkGrid}>
            {Object.entries(tires || {}).map(([pos, val]: any) => (
              <View key={pos} style={pdfStyles.checkRow}>
                <View>
                  <Text
                    style={[
                      pdfStyles.checkLabel,
                      { fontFamily: "Helvetica-Bold" },
                    ]}
                  >
                    {pos.toUpperCase()} Tyre
                  </Text>
                  <Text
                    style={{ fontSize: 9, color: pdfColors.na, marginTop: 4 }}
                  >
                    {val.brand} • {val.date}
                  </Text>
                </View>
                <StatusPill status={val.cond} />
              </View>
            ))}
            {Object.entries(bodyWork || {}).map(([panel, status]: any) => (
              <View key={panel} style={pdfStyles.checkRow}>
                <Text style={pdfStyles.checkLabel}>
                  {panel.replace("_", " ")}
                </Text>
                <StatusPill status={status} />
              </View>
            ))}
          </View>
        </View>
        <View style={pdfStyles.footer} fixed>
          <Text style={pdfStyles.footerText}>
            Certified Inspection by Ameen
          </Text>
          <Text
            style={pdfStyles.footerText}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

// 3. UI COMPONENTS

const LandingPage = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#dfff06] selection:text-black">
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#dfff06] rounded-full blur-[180px] opacity-10"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[180px] opacity-10"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>
      <nav className="relative z-20 px-8 py-8 max-w-7xl mx-auto flex justify-between items-center">
        <motion.img
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          src="/ameen-logo.png"
          alt="Ameen"
          className="h-10 md:h-12"
        />
        <button
          onClick={onLogin}
          className="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <Lock size={12} /> Staff Portal
        </button>
      </nav>
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#dfff06]/20 bg-[#dfff06]/5 text-[#dfff06] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Star size={12} fill="currentColor" /> Premium Verification
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 tracking-tight">
              Trust in Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff06] to-emerald-200">
                Mile Driven.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto md:mx-0">
              The regions most rigorous vehicle inspection standard. We combine
              expert mechanics with AI analysis to deliver reports you can
              actually trust.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {[
                "150+ Point Check",
                "Instant Digital Report",
                "Tamper Proof",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-medium text-gray-300"
                >
                  <CheckCircle size={16} className="text-[#dfff06]" /> {feat}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-md relative"
        >
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-[#dfff06] text-black w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(223,255,6,0.3)] z-20 border-4 border-black"
            >
              <span className="text-2xl font-black">98</span>
              <span className="text-[10px] font-bold uppercase tracking-wide">
                Score
              </span>
            </motion.div>
            <div className="space-y-6">
              <div className="w-full h-40 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <Car size={64} className="text-gray-700" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                        {i === 0 ? (
                          <Droplets size={14} />
                        ) : i === 1 ? (
                          <Activity size={14} />
                        ) : (
                          <ShieldCheck size={14} />
                        )}
                      </div>
                      <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      PASS
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Independent",
              desc: "No conflict of interest. We work for the truth.",
              icon: ShieldCheck,
            },
            {
              title: "AI Powered",
              desc: "Advanced analysis matches visual data with specs.",
              icon: Zap,
            },
            {
              title: "Secure",
              desc: "Reports are locked and verified on the cloud.",
              icon: Lock,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group"
            >
              <item.icon
                size={32}
                className="text-[#dfff06] mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const AuthScreen = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onAuthSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md p-10 rounded-[2rem] shadow-2xl border border-white/50"
      >
        <div className="text-center mb-10">
          <img
            src="/ameen-logo.png"
            alt="Login"
            className="h-14 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Inspector Portal
          </h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <InputGroup
            label="Email"
            icon={Mail}
            type="email"
            value={email}
            onChange={(val: string) => setEmail(val)}
          />
          <InputGroup
            label="Password"
            icon={Lock}
            type="password"
            value={password}
            onChange={(val: string) => setPassword(val)}
          />
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl text-center font-medium border border-red-100">
              {error}
            </div>
          )}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#111] text-white py-4 rounded-xl font-bold hover:bg-black hover:scale-[1.02] transition-all flex justify-center items-center gap-2 shadow-lg shadow-gray-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const InputGroup = ({
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
}: any) => (
  <motion.div variants={itemVariants} className="relative mb-6">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 z-10 pointer-events-none">
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (typeof onChange === "function") {
            onChange(e.target.value, e);
          }
        }}
        className="w-full bg-white border border-gray-200 rounded-xl p-4 pl-12 text-gray-900 font-medium placeholder-gray-300 focus:ring-2 focus:ring-[#dfff06] focus:border-transparent outline-none transition-all shadow-sm"
        placeholder={placeholder || " "}
      />
    </div>
  </motion.div>
);

const CheckRow = ({ label, data, onChange }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const currentStatus = data?.status || "pass";
  const update = (field: string, val: any) =>
    onChange({ ...data, [field]: val });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      let { error: uploadError } = await supabase.storage
        .from("inspection_photos")
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const {
        data: { publicUrl },
      } = supabase.storage.from("inspection_photos").getPublicUrl(filePath);
      update("photo", publicUrl);
    } catch (error) {
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="group border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between py-5 px-2 hover:bg-gray-50/50 rounded-xl transition-colors">
        <div
          className="flex items-center gap-4 w-1/3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              data?.comment || data?.photo
                ? "bg-[#dfff06] text-black shadow-md"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Plus
              size={16}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-45" : ""
              }`}
              strokeWidth={3}
            />
          </div>
          <span className="text-sm font-bold text-gray-800 leading-tight group-hover:text-black transition-colors">
            {label}
          </span>
        </div>
        <div className="flex gap-1 flex-1 justify-end bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          {["pass", "fail", "na"].map((id) => (
            <button
              key={id}
              onClick={() => update("status", id)}
              className={`flex-1 py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                currentStatus === id
                  ? id === "pass"
                    ? "bg-white text-green-700 shadow-sm ring-1 ring-black/5"
                    : id === "fail"
                    ? "bg-white text-red-600 shadow-sm ring-1 ring-black/5"
                    : "bg-white text-gray-600 shadow-sm ring-1 ring-black/5"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {id === "na" ? "N/A" : id}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {(isExpanded || data?.comment || data?.photo) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pb-6 pl-14 pr-2 overflow-hidden"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <textarea
                className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#dfff06] mb-4 transition-all resize-none font-medium text-gray-700"
                placeholder="Notes..."
                rows={2}
                value={data?.comment || ""}
                onChange={(e) => update("comment", e.target.value)}
              />
              <div className="flex items-center gap-4">
                <label
                  className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl cursor-pointer transition-all btn-spring border border-transparent ${
                    data?.photo
                      ? "bg-[#111] text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {uploading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Camera size={16} />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {uploading
                      ? "Uploading..."
                      : data?.photo
                      ? "Change"
                      : "Add Photo"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                  />
                </label>
                {data?.photo && (
                  <div className="relative group">
                    <img
                      src={data.photo}
                      alt="evidence"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                    <button
                      onClick={() => update("photo", null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <motion.div variants={itemVariants} className="mb-8">
    <h2 className="text-3xl font-black text-[#111] mb-2 tracking-tight">
      {title}
    </h2>
    <p className="text-gray-500 font-medium text-lg">{subtitle}</p>
  </motion.div>
);

const CollapsibleSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <motion.div
      variants={itemVariants}
      className="card-glass rounded-3xl mb-6 overflow-hidden border border-white/60 shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-all"
      >
        <div className="flex items-center gap-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-[#111] transition-colors ${
              isOpen ? "bg-[#dfff06]" : "bg-gray-100"
            }`}
          >
            <Icon size={24} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-[#111] tracking-tight">
            {title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={24} className="text-gray-400" />
        ) : (
          <ChevronDown size={24} className="text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="border-t border-gray-100 bg-white/40"
          >
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 4. MAIN APP LOGIC

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [appState, setAppState] = useState<
    "landing" | "auth" | "dashboard" | "form" | "viewer"
  >("landing");

  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [activeReport, setActiveReport] = useState<any>(null);
  const [editingReport, setEditingReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setAppState("dashboard");
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setAppState("landing");
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && appState === "dashboard") {
      const fetchReports = async () => {
        setLoading(true);
        const { data } = await supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (data) {
          const formatted = data.map((r) => ({
            ...r,
            vehicle: r.vehicle || {},
            customer: r.customer || {},
            stats: r.stats || { pass: 0, fail: 0, score: 0 },
            tires: r.tires || {
              fr: { brand: "", date: "", cond: "pass" },
              fl: { brand: "", date: "", cond: "pass" },
              rr: { brand: "", date: "", cond: "pass" },
              rl: { brand: "", date: "", cond: "pass" },
            },
            detailedChecks: r.detailed_checks || {},
            bodyWork: r.body_work || {},
            summary: r.summary || "",
          }));
          setSavedReports(formatted);
        }

        setLoading(false);
      };
      fetchReports();
    }
  }, [session, appState]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAppState("landing");
  };

  const handleSaveReport = async (report: any, isDraft = false) => {
    try {
      setLoading(true);
      const isEditing = !!report.id;
      const payload = {
        vehicle: report.vehicle,
        customer: report.customer,
        stats: report.stats,
        summary: report.summary,
        tires: report.tires,
        detailed_checks: report.detailedChecks,
        body_work: report.bodyWork,
        status: isDraft ? "draft" : "completed",
      };

      if (isEditing) {
        await supabase.from("reports").update(payload).eq("id", report.id);
        setSavedReports((prev) =>
          prev.map((r) =>
            r.id === report.id
              ? {
                  ...r,
                  ...payload,
                  detailedChecks: payload.detailed_checks,
                  bodyWork: payload.body_work,
                }
              : r
          )
        );
      } else {
        const { data } = await supabase
          .from("reports")
          .insert([payload])
          .select();
        if (data) {
          const newReport = {
            ...data[0],
            detailedChecks: data[0].detailed_checks,
            bodyWork: data[0].body_work,
          };
          setSavedReports((prev) => [newReport, ...prev]);
        }
      }

      setEditingReport(null);
      setAppState("dashboard");
    } catch (e) {
      alert("Failed to save report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await supabase.from("reports").delete().eq("id", id);
    setSavedReports((prev) => prev.filter((r) => r.id !== id));
  };

  if (appState === "landing")
    return (
      <LandingPage
        onLogin={() => setAppState(session ? "dashboard" : "auth")}
      />
    );
  if (appState === "auth")
    return <AuthScreen onAuthSuccess={() => setAppState("dashboard")} />;
  if (appState === "dashboard")
    return (
      <DashboardView
        reports={savedReports}
        loading={loading}
        onNew={() => {
          setEditingReport(null);
          setAppState("form");
        }}
        onView={(r: any) => {
          setActiveReport(r);
          setAppState("viewer");
        }}
        onEdit={(r: any) => {
          setEditingReport(r);
          setAppState("form");
        }}
        onDelete={handleDelete}
        onLogout={handleLogout}
      />
    );
  if (appState === "viewer")
    return (
      <ReportViewer
        report={activeReport}
        onBack={() => setAppState("dashboard")}
        onEdit={() => {
          setEditingReport(activeReport);
          setAppState("form");
        }}
      />
    );

  return (
    <InspectionForm
      initialData={editingReport}
      onSave={handleSaveReport}
      onCancel={() => setAppState("dashboard")}
      isSaving={loading}
    />
  );
}

// 5. SUB VIEWS

const DashboardView = ({
  reports,
  loading,
  onNew,
  onView,
  onDelete,
  onEdit,
  onLogout,
}: any) => (
  <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-900 pb-20">
    <header className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-lg bg-[#111] backdrop-blur-md bg-opacity-95">
      <img
        src="/ameen-logo.png"
        alt="AMEEN"
        className="h-10 w-auto object-contain"
      />
      <button
        onClick={onLogout}
        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
      >
        <LogOut size={20} />
      </button>
    </header>
    <main className="max-w-xl mx-auto p-6 animate-enter">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#111] mb-2 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 font-medium">Manage inspections</p>
        </div>
        <button
          onClick={onNew}
          className="btn-spring bg-[#dfff06] text-[#111] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(223,255,6,0.3)] hover:shadow-lg transition-all"
        >
          <Plus size={20} /> New
        </button>
      </div>
      {loading && reports.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gray-400" />
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <Clipboard size={64} className="mb-4 text-gray-300" />
          <p className="font-bold text-xl text-gray-800">No reports found</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-5"
        >
          {reports.map((report: any) => (
            <motion.div
              variants={itemVariants}
              key={report.id}
              onClick={() =>
                report.status === "draft" ? onEdit(report) : onView(report)
              }
              className="group bg-white rounded-[1.5rem] p-6 shadow-sm border border-transparent hover:border-[#dfff06] hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
            >
              {report.status === "draft" && (
                <div className="absolute top-0 right-0 bg-[#dfff06] text-black text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                  Draft
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 tracking-tight">
                    {report.vehicle?.year} {report.vehicle?.make}{" "}
                    {report.vehicle?.model}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1 bg-gray-50 inline-block px-2 py-1 rounded-md">
                    {report.vehicle?.vin || "NO VIN"}
                  </p>
                  {report.customer?.name && (
                    <p className="text-sm text-gray-500 mt-3 flex items-center gap-2 font-medium">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={12} />
                      </div>{" "}
                      {report.customer.name}
                    </p>
                  )}
                </div>
                {report.status !== "draft" && (
                  <div className="flex flex-col items-end">
                    <div
                      className={`text-3xl font-black ${
                        report.stats?.score > 80
                          ? "text-green-600"
                          : report.stats?.score > 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.stats?.score}%
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase mt-1">
                      Score
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />{" "}
                    {new Date(report.created_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete report?")) onDelete(report.id);
                  }}
                  className="p-2.5 -mr-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all z-10"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  </div>
);

const ReportViewer = ({ report, onBack, onEdit }: any) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-900 pb-32">
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-lg bg-[#111] backdrop-blur-md bg-opacity-95">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-white hover:text-[#dfff06] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white font-bold text-lg">Report Details</h1>
        </div>
        <button
          onClick={onEdit}
          className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
        >
          <Edit size={16} /> Edit
        </button>
      </header>
      <main className="max-w-xl mx-auto p-6 animate-enter">
        <div className="bg-[#111] text-white p-8 rounded-[2rem] mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#dfff06] rounded-full filter blur-3xl opacity-10 transform translate-x-10 -translate-y-10"></div>
          <div className="flex justify-between items-end relative z-10">
            <div>
              <div className="text-3xl font-bold mb-2 tracking-tight">
                {report.vehicle?.make} {report.vehicle?.model}
              </div>
              <p className="text-sm text-gray-400 font-mono opacity-60">
                {report.vehicle?.vin}
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-black text-[#dfff06] tracking-tighter">
                {report.stats?.score}%
              </div>
              <div className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">
                Health Score
              </div>
            </div>
          </div>
        </div>
        {(report.customer?.name || report.customer?.mobile) && (
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 space-y-4 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Customer Information
            </h3>
            {report.customer.name && (
              <div className="flex items-center gap-4 font-bold text-lg">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>{" "}
                {report.customer.name}
              </div>
            )}
            {report.customer.mobile && (
              <div className="flex items-center gap-4 text-gray-600 font-medium">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Phone size={20} />
                </div>{" "}
                {report.customer.mobile}
              </div>
            )}
          </div>
        )}
        <div className="mb-8">
          {isClient && (
            <PDFDownloadLink
              document={<ReportDocument {...normalizeReportForPdf(report)} />}
              fileName={`Ameen_${report.vehicle?.vin || "Report"}.pdf`}
              className="w-full block text-decoration-none"
            >
              {({ loading }) => (
                // FIX: Changed <button> to <div> to avoid HTML nesting error (<a> inside <button>)
                <div className="w-full py-5 rounded-2xl bg-white text-[#111] font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all btn-spring border border-gray-100 cursor-pointer">
                  {loading ? "Generating..." : "Download Official PDF"}{" "}
                  {!loading && (
                    <CheckCircle
                      className="text-green-600"
                      size={24}
                      // lucide ignores weight but safe to leave out
                    />
                  )}
                </div>
              )}
            </PDFDownloadLink>
          )}
        </div>
        <div className="card-glass rounded-3xl p-8 border border-white/50">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-gray-400" /> Inspector Notes
          </h3>
          <div className="bg-white/80 p-6 rounded-2xl text-sm text-gray-600 leading-relaxed border border-gray-100 shadow-inner">
            {report.summary || "No notes provided."}
          </div>
        </div>
      </main>
    </div>
  );
};

const InspectionForm = ({ onSave, onCancel, initialData, isSaving }: any) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [vehicle, setVehicle] = useState(
    initialData?.vehicle || {
      vin: "",
      odo: "",
      make: "",
      model: "",
      year: "",
      trim: "",
    }
  );
  const [detailedChecks, setDetailedChecks] = useState<Record<string, any>>(
    initialData?.detailedChecks || {}
  );
  const [bodyWork, setBodyWork] = useState<Record<string, string>>(
    initialData?.bodyWork || {}
  );
  const [tires, setTires] = useState(
    initialData?.tires || {
      fr: { brand: "", date: "", cond: "pass" },
      fl: { brand: "", date: "", cond: "pass" },
      rr: { brand: "", date: "", cond: "pass" },
      rl: { brand: "", date: "", cond: "pass" },
    }
  );
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [customer, setCustomer] = useState(
    initialData?.customer || { name: "", mobile: "", email: "" }
  );

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const init: Record<string, any> = { ...detailedChecks };
    Object.values(INSPECTION_CATEGORIES).forEach((cat: any) =>
      cat.items.forEach((item: string) => {
        if (!init[item])
          init[item] = { status: "pass", comment: "", photo: null };
      })
    );
    setDetailedChecks(init);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const updateCheck = (label: string, data: any) =>
    setDetailedChecks((prev) => ({ ...prev, [label]: data }));
  const updateTire = (pos: string, field: string, val: string) =>
    setTires((prev: any) => ({
      ...prev,
      [pos]: { ...prev[pos], [field]: val },
    }));
  const stats = useMemo(() => {
    const items = Object.values(detailedChecks);
    if (!items.length) return { pass: 0, fail: 0, score: 0 };
    const pass = items.filter((v: any) => v.status === "pass").length;
    return {
      pass,
      fail: items.filter((v: any) => v.status === "fail").length,
      score: Math.round((pass / items.length) * 100),
    };
  }, [detailedChecks]);
  const handleSaveDraft = () => {
    onSave(
      {
        id: initialData?.id,
        vehicle,
        detailedChecks,
        bodyWork,
        tires,
        summary,
        customer,
        stats,
      },
      true
    );
  };
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-32 font-sans text-gray-900 selection:bg-[#dfff06] selection:text-black">
      <header className="sticky top-0 z-50 bg-[#111] backdrop-blur-md bg-opacity-95 shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/ameen-logo.png"
              alt="AMEEN"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="text-gray-400 hover:text-[#dfff06] text-sm font-bold flex items-center gap-2 transition-colors mr-2 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={18} />
            )}{" "}
            Save Draft
          </button>
        </div>
        <div className="h-1 w-full bg-gray-800">
          <motion.div
            className="h-full bg-[#dfff06]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            {step === 1 && (
              <div className="space-y-6">
                <SectionHeader
                  title="Vehicle Identity"
                  subtitle="Start the inspection."
                />
                <div className="card-glass rounded-3xl p-6 space-y-4">
                  <InputGroup
                    label="VIN Number"
                    icon={Tag}
                    value={vehicle.vin}
                    onChange={(v: string) => setVehicle({ ...vehicle, vin: v })}
                  />
                  <InputGroup
                    label="Odometer (KM)"
                    icon={Gauge}
                    type="number"
                    value={vehicle.odo}
                    onChange={(v: string) => setVehicle({ ...vehicle, odo: v })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Make"
                    icon={Car}
                    value={vehicle.make}
                    onChange={(v: string) =>
                      setVehicle({ ...vehicle, make: v })
                    }
                  />
                  <InputGroup
                    label="Model"
                    icon={Tag}
                    value={vehicle.model}
                    onChange={(v: string) =>
                      setVehicle({ ...vehicle, model: v })
                    }
                  />
                  <InputGroup
                    label="Year"
                    icon={Calendar}
                    type="number"
                    value={vehicle.year}
                    onChange={(v: string) =>
                      setVehicle({ ...vehicle, year: v })
                    }
                  />
                  <InputGroup
                    label="Trim"
                    icon={Sliders}
                    value={vehicle.trim}
                    onChange={(v: string) =>
                      setVehicle({ ...vehicle, trim: v })
                    }
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <SectionHeader
                  title="Exterior Body"
                  subtitle="Tap panels to change status."
                />
                <div className="grid gap-3">
                  {[
                    "Front Bumper",
                    "Hood",
                    "Roof",
                    "Trunk",
                    "L. Fender",
                    "R. Fender",
                    "L. Doors",
                    "R. Doors",
                  ].map((panel) => {
                    const key = panel.toLowerCase().replace(" ", "_");
                    const s = bodyWork[key] || "original";
                    return (
                      <div
                        key={key}
                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
                      >
                        <div className="flex justify-between mb-3">
                          <span className="font-bold text-gray-800 text-lg">
                            {panel}
                          </span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {[
                            {
                              id: "original",
                              l: "Original",
                              c: "bg-[#111] text-white",
                            },
                            {
                              id: "paint",
                              l: "Repaint",
                              c: "bg-orange-500 text-white",
                            },
                            {
                              id: "scratch",
                              l: "Scratch",
                              c: "bg-yellow-400 text-black",
                            },
                            {
                              id: "accident",
                              l: "Accident",
                              c: "bg-red-600 text-white",
                            },
                          ].map((o) => (
                            <button
                              key={o.id}
                              onClick={() =>
                                setBodyWork({ ...bodyWork, [key]: o.id })
                              }
                              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap btn-spring shadow-sm ${
                                s === o.id ? o.c : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {o.l}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <SectionHeader
                  title="Cabin & Electrics"
                  subtitle="Tap items to expand details."
                />
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {["interior", "electrical"].map((catKey) => {
                    const cat = (INSPECTION_CATEGORIES as any)[catKey];
                    return (
                      <CollapsibleSection
                        key={catKey}
                        title={cat.title}
                        icon={cat.icon}
                        defaultOpen={true}
                      >
                        {cat.items.map((item: string) => (
                          <CheckRow
                            key={item}
                            label={item}
                            data={detailedChecks[item]}
                            onChange={(d: any) => updateCheck(item, d)}
                          />
                        ))}
                      </CollapsibleSection>
                    );
                  })}
                </motion.div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-6">
                <SectionHeader
                  title="Tyres & Brakes"
                  subtitle="Check dates & condition."
                />
                <div className="space-y-4">
                  {["fr", "fl", "rr", "rl"].map((pos) => {
                    const t = (tires as any)[pos];
                    return (
                      <div
                        key={pos}
                        className="card-glass rounded-3xl p-6 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-black text-xl text-gray-800 flex items-center gap-3">
                            <Disc className="text-gray-400" size={24} />{" "}
                            {pos.toUpperCase()}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              t.cond === "pass"
                                ? "bg-[#dfff06] text-black"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {t.cond}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <InputGroup
                            label="Brand"
                            icon={Tag}
                            value={t.brand}
                            onChange={(v: string) =>
                              updateTire(pos, "brand", v)
                            }
                          />
                          <InputGroup
                            label="Date"
                            icon={Calendar}
                            type="number"
                            value={t.date}
                            onChange={(v: string) => updateTire(pos, "date", v)}
                          />
                        </div>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                          <button
                            onClick={() => updateTire(pos, "cond", "pass")}
                            className={`flex-1 py-3 rounded-lg font-bold text-xs transition-all ${
                              t.cond === "pass"
                                ? "bg-white shadow-sm text-green-700"
                                : "text-gray-400"
                            }`}
                          >
                            PASS
                          </button>
                          <button
                            onClick={() => updateTire(pos, "cond", "fail")}
                            className={`flex-1 py-3 rounded-lg font-bold text-xs transition-all ${
                              t.cond === "fail"
                                ? "bg-white shadow-sm text-red-600"
                                : "text-gray-400"
                            }`}
                          >
                            FAIL
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {["brakes"].map((catKey) => {
                    const cat = (INSPECTION_CATEGORIES as any)[catKey];
                    return (
                      <CollapsibleSection
                        key={catKey}
                        title={cat.title}
                        icon={cat.icon}
                        defaultOpen={true}
                      >
                        {cat.items.map((item: string) => (
                          <CheckRow
                            key={item}
                            label={item}
                            data={detailedChecks[item]}
                            onChange={(d: any) => updateCheck(item, d)}
                          />
                        ))}
                      </CollapsibleSection>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-6">
                <SectionHeader
                  title="Mechanical"
                  subtitle="Under hood, chassis, suspension."
                />
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {["mechanical", "suspension", "chassis"].map((catKey) => {
                    const cat = (INSPECTION_CATEGORIES as any)[catKey];
                    return (
                      <CollapsibleSection
                        key={catKey}
                        title={cat.title}
                        icon={cat.icon}
                        defaultOpen={true}
                      >
                        {cat.items.map((item: string) => (
                          <CheckRow
                            key={item}
                            label={item}
                            data={detailedChecks[item]}
                            onChange={(d: any) => updateCheck(item, d)}
                          />
                        ))}
                      </CollapsibleSection>
                    );
                  })}
                </motion.div>
              </div>
            )}
            {step === 6 && (
              <div className="space-y-6">
                <SectionHeader
                  title="Finalize"
                  subtitle="Review and Generate."
                />
                <div className="bg-[#111] text-white p-6 rounded-3xl mb-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfff06] rounded-full filter blur-3xl opacity-10 transform translate-x-10 -translate-y-10"></div>
                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">
                        Health Score
                      </p>
                      <div className="text-5xl font-heading font-black text-[#dfff06]">
                        {stats.score}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-400 mb-1">
                        {stats.pass} CHECKS PASSED
                      </div>
                      <div className="text-sm font-bold text-red-400">
                        {stats.fail} ISSUES FOUND
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-glass rounded-3xl p-6 mb-8">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={20} /> Customer Details (Optional)
                  </h3>
                  <InputGroup
                    label="Customer Name"
                    icon={User}
                    value={customer.name}
                    onChange={(v: string) =>
                      setCustomer({ ...customer, name: v })
                    }
                  />
                  <InputGroup
                    label="Mobile Number"
                    icon={Phone}
                    type="tel"
                    value={customer.mobile}
                    onChange={(v: string) =>
                      setCustomer({ ...customer, mobile: v })
                    }
                  />
                  <InputGroup
                    label="Email Address"
                    icon={Mail}
                    type="email"
                    value={customer.email}
                    onChange={(v: string) =>
                      setCustomer({ ...customer, email: v })
                    }
                  />
                </div>
                <div className="card-glass rounded-3xl p-6 mb-8">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Clipboard size={20} /> Inspector Summary
                  </h3>
                  <textarea
                    className="w-full bg-gray-50 border-0 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#dfff06] resize-none"
                    rows={4}
                    placeholder="Write your professional opinion here..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  {isClient && (
                    <PDFDownloadLink
                      document={
                        <ReportDocument
                          {...normalizeReportForPdf({
                            vehicle,
                            customer,
                            stats,
                            tires,
                            detailedChecks,
                            bodyWork,
                            summary,
                            date: initialData?.created_at || initialData?.date,
                          })}
                        />
                      }
                      fileName={`Ameen_${vehicle.vin || "Report"}.pdf`}
                      className="w-full block text-decoration-none"
                    >
                      {({ loading }) => (
                        // FIX: Changed <button> to <div> to avoid HTML nesting error (<a> inside <button>)
                        <div
                          className={`w-full py-5 rounded-2xl bg-[#111] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all btn-spring hover:scale-[1.01] cursor-pointer ${
                            loading || isSaving ? "opacity-70" : ""
                          }`}
                        >
                          {loading ? "Generating..." : "Download Official PDF"}
                          {!loading && (
                            <CheckCircle className="text-[#dfff06]" size={24} />
                          )}
                        </div>
                      )}
                    </PDFDownloadLink>
                  )}

                  <button
                    onClick={() =>
                      onSave({
                        id: initialData?.id,
                        vehicle,
                        detailedChecks,
                        bodyWork,
                        tires,
                        summary,
                        customer,
                        stats,
                      })
                    }
                    disabled={isSaving}
                    className="w-full py-5 rounded-2xl bg-white text-[#111] border-2 border-gray-100 font-bold text-lg hover:border-[#dfff06] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm hover:shadow-md"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save size={20} /> Save Report & Exit
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#fff]/80 backdrop-blur-xl border-t border-gray-200 p-4 pb-8 z-40">
        <div className="max-w-xl mx-auto flex gap-4">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-gray-100 bg-white hover:border-[#1a1a1a] transition-all shadow-sm disabled:opacity-50"
          >
            {step === 1 ? <Home size={24} /> : <ArrowLeft size={24} />}
          </button>
          <button
            onClick={() => setStep((s) => Math.min(6, s + 1))}
            disabled={step === totalSteps}
            className={`flex-1 h-16 rounded-2xl bg-[#111] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl btn-spring hover:scale-[1.02] ${
              step === totalSteps ? "opacity-50" : ""
            }`}
          >
            Next Step <ArrowRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};
