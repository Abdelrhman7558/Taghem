"use client";

import { useState } from "react";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import { Download, Search, Filter } from "lucide-react";
import * as XLSX from "xlsx"; // I'll need to install xlsx or just use simple csv generation

// Simple CSV generator
const downloadCSV = (data: any[]) => {
    const headers = ["ID", "Type", "Date", "Time", "Name", "Phone", "Email", "Persons", "Notes", "Created At"];
    const csvContent = [
        headers.join(","),
        ...data.map(row => [
            row.id,
            row.type,
            row.date,
            row.time,
            `"${row.name}"`,
            `"${row.phone}"`,
            row.email,
            row.persons,
            `"${row.notes || ''}"`,
            row.created_at
        ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function BookingsTable({ bookings }: { bookings: any[] }) {
    const [filter, setFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.name.toLowerCase().includes(filter.toLowerCase()) ||
            booking.phone.includes(filter) ||
            booking.email.toLowerCase().includes(filter.toLowerCase());
        const matchesType = typeFilter === "all" || booking.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border">
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        className="w-full pr-10 pl-4 py-2 rounded-lg bg-background border outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="بحث بالاسم، الهاتف، أو البريد..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        className="px-4 py-2 rounded-lg bg-background border outline-none focus:ring-2 focus:ring-primary/50"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="all">كل الحجوزات</option>
                        <option value="iftar">فطار</option>
                        <option value="suhoor">سحور</option>
                    </select>

                    <button
                        onClick={() => downloadCSV(filteredBookings)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                    >
                        <Download className="w-4 h-4" />
                        تصدير CSV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border bg-card">
                <table className="w-full text-right">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="p-4 font-medium">#</th>
                            <th className="p-4 font-medium">العميل</th>
                            <th className="p-4 font-medium">النوع</th>
                            <th className="p-4 font-medium">التاريخ</th>
                            <th className="p-4 font-medium">الوقت</th>
                            <th className="p-4 font-medium">الأشخاص</th>
                            <th className="p-4 font-medium">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                    لا توجد حجوزات مطابقة
                                </td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-accent/5 transition-colors">
                                    <td className="p-4">{booking.id}</td>
                                    <td className="p-4">
                                        <div className="font-semibold">{booking.name}</div>
                                        <div className="text-sm text-muted-foreground" dir="ltr">{booking.phone}</div>
                                        <div className="text-xs text-muted-foreground truncate max-w-[150px]" dir="ltr">{booking.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${booking.type === 'iftar' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {booking.type === 'iftar' ? 'فطار' : 'سحور'}
                                        </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        {format(new Date(booking.date), "dd MMM yyyy", { locale: arEG })}
                                    </td>
                                    <td className="p-4">{booking.time}</td>
                                    <td className="p-4">{booking.persons}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                            مؤكد
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                إجمالي النتائج: {filteredBookings.length}
            </div>
        </div>
    );
}
