import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect, useRef, useState } from "react"
import { addProducer } from "../api"
import { Toast } from "primereact/toast"

const AddProducer = (props) => {
  const { visible, setVisible, refreshProducers } = props || {}
  const [producer, setProducer] = useState({
    name: '',
    bio: '',
    dateOfBirth: '',
    gender: ''
  })
  const toast = useRef(null)

  useEffect(() => {
    if (visible) return
    resetHandler()
  }, [visible])

  const addProducerHandler = async () => {
    if (!producer?.name) return
    const result = await addProducer(producer)
    if (!result?.data || result.error) {
      toast.current.show({ severity: 'danger', summary: 'Error', detail: result.error || 'Producer not saved' })
      return
    }
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Producer saved successfully' })
    refreshProducers()
  }

  const resetHandler = () => {
    setProducer({
      name: '',
      bio: '',
      dateOfBirth: '',
      gender: ''
    })
  }

  const cancelHandler = () => {
    if (!visible) return
    setVisible(false)
  }

  return (
    <Dialog header="Add Producer" visible={visible} onHide={cancelHandler}>
      <Toast ref={toast} />
      <div className="card mt-8">
          <FloatLabel className="mb-8">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                className={`mr-2 w-md${producer.name ? '' : ' p-invalid'}`}
                onChange={e => setProducer(producer => ({ ...producer, name: e.target.value }))}
                value={producer.name}
              />
          </FloatLabel>
          <FloatLabel className="mb-8">
              <label htmlFor="dateOfBirth">Date of birth</label>
              <Calendar id="dateOfBirth" className="w-md" value={producer.dateOfBirth ? new Date(producer.dateOfBirth) : null} onChange={e => {
                const dateOfBirth = `${e.value.toLocaleString('en-US', { year: "numeric" })}-${e.value.toLocaleString('en-US', { month: "2-digit" })}-${e.value.toLocaleString('en-US', { day: "2-digit" })}`
                setProducer(producer => ({ ...producer, dateOfBirth }))
              }} />
          </FloatLabel>
          <FloatLabel className="mb-8">
              <label htmlFor="bio">Bio</label>
              <InputTextarea
                id="bio"
                className="mr-2 w-md"
                onChange={e => setProducer(producer => ({ ...producer, bio: e.target.value }))}
                value={producer.bio}
              />
          </FloatLabel>
          <FloatLabel className="mb-3">
              <label htmlFor="gender">Gender</label>
              <Dropdown
                id="gender"
                className="w-md"
                onChange={e => setProducer(producer => ({ ...producer, gender: e.value }))}
                value={producer.gender}
                options={['Male', 'Female', 'Others']}
              ></Dropdown>
          </FloatLabel>
          <div className="flex flex-wrap items-center mt-6 mb-6 gap-2">
            <Button label="Cancel" severity="secondary" onClick={cancelHandler}></Button>
            <Button label="Reset" severity="secondary" onClick={resetHandler}></Button>
            <Button label="Add Producer" onClick={addProducerHandler}></Button>
          </div>
      </div>
    </Dialog>
  )
}

export default AddProducer
