'use client';

import styles from "@/app/page.module.scss";
import {Input, Paper} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import supabase from "@/app/supabase";

const Form = () => {
  const [form, setForm] = useState<Record<string, string | number>>({});
  const [formType, setFormType] = useState<string | null>(null);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => {
      const newState = {...prevState};
      newState[e.target.name] = e.target.value;
      return newState;
    })
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({});
    setFormType(e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formType === 'rmc' ? {
      date: form.date,
      name: form.name,
      link: form.link,
      ats: form.ats,
      golds: form.golds
      } : {
      date: form.date,
      name: form.name,
      link: form.link,
      ats: form.ats,
      skips: form.skips,
      time: form.time
    }

    const result = await supabase.from(formType!).insert(data as any)

    if (result.error) {
      window.alert("Error submitting");
    } else {
      window.alert("Submitted for validation");
    }
  }

  return (
    <Paper style={{ padding: '24px', width: '75vw', minHeight: '50vh' }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <select value={formType ?? ''} onChange={handleSelectChange}>
            <option value='' selected disabled>-- Select at option --</option>
            <option value="rmc">RMC</option>
            <option value="rms">RMS</option>
          </select>
        </div>
        {formType &&
          <>
        <Input defaultValue={form.date} name='date' placeholder="Run Date" type='date' required onChange={handleFieldChange} />
        <Input defaultValue={form.name} name='name' placeholder="Ingame name" required onChange={handleFieldChange} />
        <Input defaultValue={form.link} name='link' placeholder="link to run" required onChange={handleFieldChange} />
        <Input defaultValue={form.ats} name='ats' placeholder="No. Author medals" type='number' required onChange={handleFieldChange} />
        {formType === 'rmc' && <Input defaultValue={form.gold} name='golds' placeholder="No. Gold medals" type='number' required onChange={handleFieldChange} />}
        {formType === 'rms' && <Input defaultValue={form.skips} name='skips' placeholder="No. Skips" type='number' required onChange={handleFieldChange} />}
        {formType === 'rms' && <Input defaultValue={form.time} name='time' placeholder="Total Time (optional)" onChange={handleFieldChange} />}
        <button className={styles.submitButton} type={'submit'}>Submit Run</button>
          </>
        }
      </form>
    </Paper>
  )
}

export default Form;