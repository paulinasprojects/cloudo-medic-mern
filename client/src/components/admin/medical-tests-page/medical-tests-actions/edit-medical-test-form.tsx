import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Biochemistry, BloodTest, ImagingTest, MedicalTests, MedicalTestStatus, Urine } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMedicalTestByAdmins } from "@/services/admin-service";
import { MultiSelect, MultiSelectContent, MultiSelectOption, MultiSelectTrigger } from "@/components/common/multi-select";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import DatePicker from "@/components/common/date-picker";



interface Props {
  onSuccess: () => void;
  data: MedicalTests;
}

export default function EditMedicalTestForm({ onSuccess, data }: Props) {
  const [patientId, setPatientId] = useState<string>(data.patientId ?? "");
  const [doctorId, setDoctorId] = useState<string>(data.doctorId ?? "");
  const [date, setDate] = useState<string>(data.date ??"");
  const [bloodTests, setBloodTests] = useState<string[]>(data.bloodTests ?? []);
  const [biochemistryTests, setBiochemistryTests] = useState<string[]>(data.biochemistryTests ?? []);
  const [imagingTests, setImagingTests] = useState<string[]>(data.imagingTests ?? []);
  const [urineTests, setUrineTests] = useState<string[]>(data.urineTests ?? []);
  const [status, setStatus] = useState<MedicalTestStatus | string>(data.status ?? "");
  const [notes, setNotes] = useState<string>(data.notes ?? "");
  const queryClient = useQueryClient();

  const { mutate: editMedicalTestMutation, isPending, error } = useMutation({
    mutationFn: (
      testData: {
        date: string;
        bloodTests?: string[];
        biochemistryTests?: string[];
        imagingTests?: string[];
        urineTests?: string[];
        status: string;
        notes: string;
      }
    ) => editMedicalTestByAdmins(data.id, testData),
    onSuccess: () => {
      toast.success("Medical Test updated successfully")
      queryClient.invalidateQueries({ queryKey: ["medicaltest"] })
      onSuccess();
    },
     onError: () => {
      toast.error("Failed to update medical test")
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMedicalTestMutation({
      date,
      bloodTests,
      biochemistryTests,
      imagingTests,
      urineTests,
      status,
      notes
    });
  }


  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 px-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <span className="text-red-500">
            {axios.isAxiosError(error)
            ? error.response?.data?.error ?? error.message
            : error.message}
          </span>
        )}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
             <label htmlFor="doctor-id" className="label-class">
              Doctor Id
            </label>
            <input 
              type="text" 
              id="doctor-id" 
              placeholder="d67cdba2-8731-4e28-aa03-fda59bf16b31" 
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              disabled={true}
              className="input-class"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="patient-id" className="label-class">
              Patient Id
            </label>
            <input 
              type="text" 
              id="patient-id" 
              placeholder="e50cdba2-8731-4e28-aa03-fda59bf16b31" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              disabled={true}
              className="input-class"
            />
          </div>
           <div className="flex flex-col gap-2">
            <label htmlFor="date" className="label-class">
              Date
            </label>
            <DatePicker
              placeholder="Pick a date"
              value={date ? new Date(date) : undefined}
              onChange={(date) => setDate(date
                 ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
              : "")}
            />
          </div>
           <div className="flex flex-col gap-2">
            <label htmlFor="blood-tests">Blood Tests</label>
            <MultiSelect 
              values={bloodTests} 
              onValuesChange={(value) => setBloodTests(value)}
              >
                <MultiSelectTrigger placeholder="Select blood tests"/>
                <MultiSelectContent>
                  {Object.values(BloodTest).map((test) => (
                    <MultiSelectOption
                      key={test}
                      value={test}
                    >
                      {test}
                    </MultiSelectOption>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
          </div>
           <div className="flex flex-col gap-2">
            <MultiSelect 
              values={biochemistryTests} 
              onValuesChange={(value) => setBiochemistryTests(value)}
              >
                <MultiSelectTrigger placeholder="Select biochemistry tests"/>
                <MultiSelectContent>
                  {Object.values(Biochemistry).map((test) => (
                    <MultiSelectOption
                      key={test}
                      value={test}
                    >
                      {test}
                    </MultiSelectOption>
                  ))}
                </MultiSelectContent>
            </MultiSelect>
          </div>
          <div className="flex flex-col gap-2">
            <MultiSelect 
              values={imagingTests} 
              onValuesChange={(value) => setImagingTests(value)}
              >
                <MultiSelectTrigger placeholder="Select imaging tests"/>
                <MultiSelectContent>
                  {Object.values(ImagingTest).map((test) => (
                    <MultiSelectOption
                      key={test}
                      value={test}
                    >
                      {test}
                    </MultiSelectOption>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
             <div className="flex flex-col gap-2">
              <MultiSelect 
                values={urineTests} 
                onValuesChange={(value) => setUrineTests(value)}
                >
                  <MultiSelectTrigger placeholder="Select urine tests"/>
                  <MultiSelectContent>
                    {Object.values(Urine).map((test) => (
                      <MultiSelectOption
                        key={test}
                        value={test}
                      >
                        {test}
                      </MultiSelectOption>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
            </div>
             <div className="flex flex-col gap-2">
              <label className="label-class">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as MedicalTestStatus)}
              >
                <SelectTrigger placeholder="Select status"/>
                <SelectContent>
                  {Object.values(MedicalTestStatus).map((status) => (
                    <SelectOption
                      key={status}
                      value={status}
                    >
                      {status}
                    </SelectOption>
                  ))}
                </SelectContent>
              </Select>
          </div>
           <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="label-class">
              Notes
            </label>
            <input 
              id="notes" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isPending}
              required
              className="resize-none w-full py-4 input-class"
            />
          </div>
        </div>
         <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            "Updating..."
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  )
}
