import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect, useRef, useState } from "react"
import { addActor } from "../api"
import { Toast } from "primereact/toast"

const AddActor = (props) => {
  const { visible, setVisible, refreshActors } = props || {}
  const [actor, setActor] = useState({
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

  const addActorHandler = async () => {
    if (!actor?.name) return
    const result = await addActor(actor)
    if (!result?.data || result.error) {
      toast.current.show({ severity: 'danger', summary: 'Error', detail: result.error || 'Actor not saved' })
      return
    }
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Actor saved successfully' })
    refreshActors()
  }

  const resetHandler = () => {
    setActor({
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
    <Dialog header="Add Actor" visible={visible} onHide={cancelHandler}>
      <Toast ref={toast} />
      <div className="card mt-8">
        <FloatLabel className="mb-8">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              className={`mr-2 w-md${actor.name ? '' : ' p-invalid'}`}
              onChange={e => setActor(actor => ({ ...actor, name: e.target.value }))}
              value={actor.name}
            />
        </FloatLabel>
        <FloatLabel className="mb-8">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <Calendar id="dateOfBirth" className="w-md" value={actor.dateOfBirth ? new Date(actor.dateOfBirth) : null} onChange={e => {
              const dateOfBirth = `${e.value.toLocaleString('en-US', { year: "numeric" })}-${e.value.toLocaleString('en-US', { month: "2-digit" })}-${e.value.toLocaleString('en-US', { day: "2-digit" })}`
              setActor(actor => ({ ...actor, dateOfBirth }))
            }} />
        </FloatLabel>
        <FloatLabel className="mb-8">
            <label htmlFor="bio">Bio</label>
            <InputTextarea
              id="bio"
              className="mr-2 w-md"
              onChange={e => setActor(actor => ({ ...actor, bio: e.target.value }))}
              value={actor.bio}
            />
        </FloatLabel>
        <FloatLabel className="mb-3">
            <label htmlFor="gender">Gender</label>
            <Dropdown
              id="gender"
              className="w-md"
              onChange={e => setActor(actor => ({ ...actor, gender: e.value }))}
              value={actor.gender}
              options={['Male', 'Female', 'Others']}
            ></Dropdown>
        </FloatLabel>
        <div className="flex flex-wrap items-center mt-6 mb-6 gap-2">
          <Button label="Cancel" severity="secondary" onClick={cancelHandler}></Button>
          <Button label="Reset" severity="secondary" onClick={resetHandler}></Button>
          <Button label="Add Actor" onClick={addActorHandler}></Button>
        </div>
      </div>
    </Dialog>
  )
}

export default AddActor
