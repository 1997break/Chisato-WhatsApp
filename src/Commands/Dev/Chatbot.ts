import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('chatbot', {
    description: 'enable/disable private message chat bot feature.',
    category: 'dev',
    usage: 'chatbot true',
    exp: 20,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) {
        const sections = []
            let text = '🤖 *Chatbot Feature*'
                const rows: IRows[] = []
                rows.push(
                    {
                        title: 'Enable Chatbot',
                        rowId: `${this.client.config.prefix}chatbot true`
                    },
                    {
                        title: 'Disable Chatbot',
                        rowId: `${this.client.config.prefix}chatbot false`
                    }
                )
                sections.push({ title: '🤖 Chatbot Feature', rows })
                text += `\n\nEnable/Disable chatbot in client personal DM.`
            return void M.reply(
                text,
                'text',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                {
                    sections,
                    buttonText: 'Chatbot Feature'
                }
            )
        }
        const key = context.toLowerCase().trim()
        const action = key === 'true' ? true : false
        await this.client.DB.updateFeature('chatbot', action)
        return void M.reply(`${action === true ? '🟩' : '🟥'} ${action === true ? 'Enabled' : 'Disabled'}`)
    }
}

interface IRows {
    title: string
    rowId: string
    description?: string
}
