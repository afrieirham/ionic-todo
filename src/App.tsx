import React, { useState } from 'react'
import {
  IonApp,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import { menuOutline, addOutline } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import data from './data'

const App: React.FC = () => {
  const [list, setList] = useState(data)
  const [todo, setTodo] = useState<string>()

  const handleToggle = (id: number) => {
    const updatedList = list.map((i) => {
      if (i.id === id)
        return {
          ...i,
          isComplete: !i.isComplete,
        }

      return i
    })

    const notCompleted = updatedList.filter((i) => !i.isComplete)
    const completed = updatedList.filter((i) => i.isComplete)

    const sortedList = [...notCompleted, ...completed]

    setList(sortedList)
  }

  const addTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!todo) return

    const newTodo = { id: Math.random(), isComplete: false, title: todo }
    const newList = [...list, newTodo]
    setList(newList)
    setTodo('')
  }

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={(event) => event.detail.complete()}>
            {list.map((i) => (
              <IonItem key={i.id}>
                <IonCheckbox
                  slot='start'
                  value={i.title}
                  checked={!!i.isComplete}
                  onIonChange={() => handleToggle(i.id)}
                />
                <IonLabel>{i.title}</IonLabel>
                <IonReorder slot='end'>
                  <IonIcon icon={menuOutline} />
                </IonReorder>
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList>
        <form onSubmit={addTodo}>
          <IonItem>
            <IonInput
              value={todo}
              placeholder='What to do?'
              onIonChange={(e) => setTodo(e.detail.value!)}
            />
            <IonButton type='submit' fill='clear' slot='end'>
              <IonIcon slot='icon-only' icon={addOutline} />
            </IonButton>
          </IonItem>
        </form>
      </IonContent>
    </IonApp>
  )
}

export default App
