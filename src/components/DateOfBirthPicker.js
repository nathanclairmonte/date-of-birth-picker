import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const YearPicker = ({ selectedYear, setSelectedYear }) => {
    // create an array of years, starting with current and going back 99 years
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <Select onValueChange={(value) => setSelectedYear(parseInt(value, 10))}>
            <SelectTrigger>
                <SelectValue placeholder={selectedYear} />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const MonthPicker = ({ selectedMonth, setSelectedMonth }) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <Select onValueChange={(value) => setSelectedMonth(months.indexOf(value))}>
            <SelectTrigger>
                <SelectValue placeholder={months[selectedMonth]} />
            </SelectTrigger>
            <SelectContent>
                {months.map((month) => (
                    <SelectItem key={month} value={month}>
                        {month}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

const DateOfBirthPicker = ({ className }) => {
    const [date, setDate] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [popoverDisplayDate, setPopoverDisplayDate] = useState(new Date());
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        if (date) {
            const newDate = new Date(year, date.getMonth(), date.getDate());
            setDate(newDate);
            setPopoverDisplayDate(newDate);
        } else {
            setPopoverDisplayDate(new Date(year, popoverDisplayDate.getMonth()));
        }
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        if (date) {
            const newDate = new Date(date.getFullYear(), month, date.getDate());
            setDate(newDate);
            setPopoverDisplayDate(newDate);
        } else {
            setPopoverDisplayDate(new Date(popoverDisplayDate.getFullYear(), month));
        }
    };

    const handleDateSelect = (date) => {
        setDate(date);
        setIsPopoverOpen(false);

        // if you wanna use it in a form, you can use this
        // don't forget to destrucutre formData and setFormData as props above if you do
        // setFormData({ ...formData, dateOfBirth: date });
    };

    return (
        <Popover side="bottom" open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-60 h-11 justify-start text-left font-normal border-slate-300",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 flex flex-col items-center">
                <div className="flex gap-2 p-2">
                    <YearPicker selectedYear={selectedYear} setSelectedYear={handleYearChange} />
                    <MonthPicker
                        selectedMonth={selectedMonth}
                        setSelectedMonth={handleMonthChange}
                    />
                </div>
                <Calendar
                    initialFocus
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    // NB: these props are called month and onMonthChange on the DayPicker in the
                    //     calendar component. I just renamed them here to be more explicit, since
                    //     they update the whole display date, not just the month
                    displayDate={popoverDisplayDate}
                    setDisplayDate={setPopoverDisplayDate}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DateOfBirthPicker;
