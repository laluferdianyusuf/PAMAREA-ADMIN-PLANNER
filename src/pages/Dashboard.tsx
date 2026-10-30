import { Calendar, Location, Sun, UserOctagon, Warning2 } from "iconsax-react";
import { useMemo } from "react";
import MapsCheckpoint from "../components/mapsCheckpoint/MapsCheckpoint";
import { useSecurityUsers } from "../hooks/users/useUsers";
import { usePatrolPoints } from "../hooks/patrol-point/usePatrolPoints";
import { usePatrolSchedules } from "../hooks/schedule/usePatrolSchedules";
import Breadcrumb from "../components/breadcrumbs/Breadcrumb";

const Dashboard = () => {
  const { data: security } = useSecurityUsers();
  const { data: checkpoints } = usePatrolPoints();
  const { data: shift } = usePatrolSchedules();

  const shiftActive = shift?.data.find((s) => s.name);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const summaryCardData = [
    {
      title: "Total Security",
      value: security?.data.length,
      type: "Security",
      icon: <UserOctagon size={22} color="#2563EB" />,
      bg: "bg-blue-50",
    },
    {
      title: "Jumlah Area Patrol",
      value: checkpoints?.length,
      type: "Area",
      icon: <Location size={22} color="#4F46E5" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Jumlah Temuan Patrol",
      value: 5,
      type: "Temuan",
      icon: <Warning2 size={22} color="#DC2626" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen ">
      <Breadcrumb
        items={[{ label: "Dashboard", path: "/" }, { label: "Command Center" }]}
      />
      <div className="px-6 pb-6">
        {/* Title */}
        <div className="mt-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-6">
            {/* Information */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

              <p className="mt-1 text-sm text-gray-500">
                Pemantauan kepatuhan patroli keamanan dan pengawasan perimeter
                operasional secara real-time.
              </p>
            </div>

            {/* Controls */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Date */}
              <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                <Calendar size={17} color="#6B7280" variant="Bulk" />

                <div>
                  <p className="text-[11px] text-gray-400">Periode</p>

                  <p className="text-xs font-semibold text-gray-700">
                    {todayFormatted ?? "Hari Ini"}
                  </p>
                </div>
              </div>

              {/* Shift */}
              <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                <Sun size={17} color="#6B7280" />

                <div>
                  <p className="text-[11px] text-gray-400">Shift Aktif</p>
                  {(shift?.data.length ?? 0 > 0) ? (
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-semibold text-gray-700">
                        {shiftActive?.name}
                      </p>
                      <div className="h-[1px] p-0.5 rounded-full bg-emerald-500 animate-ping" />
                      <p className="text-xs font-semibold text-gray-700">
                        {shiftActive?.startTime} - {shiftActive?.endTime}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">Belum ada shift</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Title */}

        {/* Card */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Total Patrol */}
          {summaryCardData.map((item) => (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <div className="mt-5 flex items-end gap-1">
                    <h1 className="text-2xl font-bold text-gray-800">
                      {item.value}
                    </h1>

                    <p className="mb-0.5 text-sm text-gray-500 ml-1">
                      {item.type}
                    </p>
                  </div>
                </div>

                <div className={`rounded-lg p-2.5 ${item.bg}`}>{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Card */}

        {/* Maps */}
        <div className="mx-auto max-w-7xl mt-5">
          <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">
              Monitoring Area Patroli
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Pantau lokasi dan checkpoint patroli satpam.
            </p>
            <MapsCheckpoint />
          </div>
        </div>
        {/* Maps */}
      </div>
    </div>
  );
};

export default Dashboard;
