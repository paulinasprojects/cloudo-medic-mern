import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { createMedicalTest } from "@/services/admin-service";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { MultiSelect, MultiSelectContent, MultiSelectOption, MultiSelectTrigger } from "@/components/common/multi-select";
import { Biochemistry, BloodTest, MedicalTestStatus, Urine, ImagingTest } from "@/types/types";
import DatePicker from "@/components/common/date-picker";

interface Props {
  onSuccess: () => void;
}

export default function AddMedicalTestForm({ onSuccess }: Props) {
  const [patientId, setPatientId] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [bloodTests, setBloodTests] = useState<string[]>([]);
  const [biochemistryTests, setBiochemistryTests] = useState<string[]>([]);
  const [imagingTests, setImagingTests] = useState<string[]>([]);
  const [urineTests, setUrineTests] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const { mutate: createMedicalTestMutation, isPending, error } = useMutation({
    mutationFn: createMedicalTest,
    onSuccess: () => {
      toast.success("Medical test created successfully")
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create a medical test")
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMedicalTestMutation({
      doctorId,
      patientId,
      date,
      biochemistryTests,
      bloodTests,
      imagingTests,
      urineTests,
      notes,
      status
    });
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 px-6 py-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <span className="text-red-500">
            {axios.isAxiosError(error)
            ? error.response?.data?.error ?? error.message
            : error.message}
          </span>
        )}
          <div className="grid md:grid-cols-2 max-sm:grid-cols-1 md:gap-10 max-sm:gap-2">
            <div className="flex flex-col md:gap-6 max-sm:gap-4">
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
                disabled={isPending}
                required
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
                disabled={isPending}
                required
                className="input-class"
              />
            </div>
            <div className="flex flex-col gap-2">
            <label className="label-class">
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
              <label className="label-class">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger placeholder="Select status"/>
                <SelectContent>
                  {MedicalTestStatus.map((status) => (
                    <SelectOption
                      key={status.id}
                      value={status.value}
                    >
                      {status.placeholder}
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
              type="text"
              id="notes" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isPending}
              required
              className="w-full py-4 input-class"
            />
          </div>
          </div>
          <div className="flex flex-col md:gap-6 max-sm:gap-4">
            <div className="flex flex-col gap-2">
              <label className="label-class">Blood Tests</label>
              <MultiSelect 
                values={bloodTests} 
                onValuesChange={(value) => setBloodTests(value)}
                >
                  <MultiSelectTrigger placeholder="Select blood tests"/>
                  <MultiSelectContent>
                    {BloodTest.map((test) => (
                      <MultiSelectOption
                        key={test.id}
                        value={test.value}
                      >
                        {test.placeholder}
                      </MultiSelectOption>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
              </div>
            <div className="flex flex-col gap-2">
              <label className="label-class">Biochemistry Tests</label>
            <MultiSelect 
              values={biochemistryTests} 
              onValuesChange={(value) => setBiochemistryTests(value)}
              >
                <MultiSelectTrigger placeholder="Select biochemistry tests"/>
                <MultiSelectContent>
                  {Biochemistry.map((test) => (
                    <MultiSelectOption
                      key={test.id}
                      value={test.value}
                    >
                      {test.placeholder}
                    </MultiSelectOption>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label-class">Imaging Tests</label>
            <MultiSelect 
              values={imagingTests} 
              onValuesChange={(value) => setImagingTests(value)}
              >
                <MultiSelectTrigger placeholder="Select imaging tests"/>
                <MultiSelectContent>
                  {ImagingTest.map((test) => (
                    <MultiSelectOption
                      key={test.id}
                      value={test.value}
                    >
                      {test.placeholder}
                    </MultiSelectOption>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label-class">Urine Tests</label>
              <MultiSelect 
                values={urineTests} 
                onValuesChange={(value) => setUrineTests(value)}
                >
                  <MultiSelectTrigger placeholder="Select urine tests"/>
                  <MultiSelectContent>
                    {Urine.map((test) => (
                      <MultiSelectOption
                        key={test.id}
                        value={test.value}
                      >
                        {test.placeholder}
                      </MultiSelectOption>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
            </div>
          </div>
        </div>
        <button
          className="create-button"
          type="submit">
          Create
        </button>
      </form>
    </div>
  )
}
