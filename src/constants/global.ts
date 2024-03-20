export const monthOptions = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export const genders = ["Male", "Female", "Other"];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const genderOptions = genders.map((item) => ({
  value: item.toLocaleLowerCase(),
  label: item,
}));
export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));
export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));
