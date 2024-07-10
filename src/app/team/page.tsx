import { SimpleLayout } from '@/components/SimpleLayout'

const people = [
  {
    name: 'Dr. Ryan Burns',
    role: 'Subtitle here',
    imageUrl:
      'https://profiles.ucalgary.ca/sites/default/files/styles/ucws_profile_picture/public/2022-11/burns%20-%20Headshots-282.jpg?h=9e707c22&itok=k5zd2T8x',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  {
    name: 'Dr. Eliot Tretter',
    role: 'Subtitle here',
    imageUrl:
      'https://profiles.ucalgary.ca/sites/default/files/styles/ucws_profile_picture/public/2022-09/Tretter%20Headshot.jpg?itok=TNWZ4RR0',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  {
    name: 'Dr. Matthew Greenberg',
    role: 'Subtitle here',
    imageUrl:
      'https://profiles.ucalgary.ca/sites/default/files/styles/ucws_profile_picture/public/2021-09/profile.jpg?itok=w6EEPnYt',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  {
    name: 'Dafne da Silva Araujo',
    role: 'Subtitle here',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  {
    name: 'Liam Moreno-Gris',
    role: 'Subtitle here',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  {
    name: 'Adrian Gonzales',
    role: 'Subtitle here',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  // More people...
]

export default function Team() {
  return (
    <SimpleLayout
      title="Meet Our Team"
      intro="We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results."
    >
      <div>
        <div className="mx-auto">
          <div className="mx-auto">
          </div>
          <ul
            role="list"
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {people.map((person) => (
              <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
                <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={person.imageUrl} alt="" />
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight">{person.name}</h3>
                  <p className="text-base leading-7">{person.role}</p>
                  <p className="mt-6 text-base leading-7">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SimpleLayout>
  )
}