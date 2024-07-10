import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Microphone, Paper } from '@/components/SocialIcons'
import { formatDate } from '@/lib/formatDate'

const articles = [
  {
    author: 'Ryan Burns',
    date: '2024-06-05',
    title: 'Est placerat in egestas erat imperdiet sed euismod nisi porta',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At in tellus integer feugiat. Neque sodales ut etiam sit amet. Maecenas pharetra convallis posuere morbi. Ut faucibus pulvinar elementum integer enim.',
    href: "#",
    icon: Paper,
    venue: "Journal of Cheeseburger"
  },
  {
    author: 'Ryan Burns',
    date: '2024-06-05',
    title: 'Est placerat in egestas erat imperdiet sed euismod nisi porta',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At in tellus integer feugiat. Neque sodales ut etiam sit amet. Maecenas pharetra convallis posuere morbi. Ut faucibus pulvinar elementum integer enim.',
    href: "#",
    icon: Microphone,
    venue: "ACM Conference on Pizza"
  },
  {
    author: 'Ryan Burns',
    date: '2024-06-05',
    title: 'Est placerat in egestas erat imperdiet sed euismod nisi porta',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At in tellus integer feugiat. Neque sodales ut etiam sit amet. Maecenas pharetra convallis posuere morbi. Ut faucibus pulvinar elementum integer enim.',
    href: "#",
    icon: Paper,
    venue: "Nature Pho"
  },
]

export default async function ArticlesIndex() {
  return (
    <SimpleLayout
      title="Our Outputs"
      intro="Explore the findings and contributions of our work."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map(article =>
            <div key={article.href} className="md:grid md:grid-cols-4 md:items-baseline">
              <Card className="md:col-span-3">
                <Card.Title href={article.href}>
                  {article.title}
                </Card.Title>
                <Card.Eyebrow
                  as="time"
                  dateTime={article.date}
                  className="md:hidden"
                  decorate
                >
                  {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Read</Card.Cta>
              </Card>
              <Card.Eyebrow
                as="time"
                dateTime={article.date}
                className="mt-1 hidden md:block"
              >
                {formatDate(article.date)}
                <h1>{article.venue}</h1>
                <article.icon />
              </Card.Eyebrow>
            </div>)}
        </div>
      </div>
    </SimpleLayout>
  )
}
