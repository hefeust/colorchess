
<script>
    import 'bulma/css/bulma.css'

    const colors = new Map()
    colors.set('light', [216, 216, 216])
    colors.set('grey', [196, 196, 0])
    colors.set('green',[0, 255, 0])
    colors.set('white',[255, 255, 255])
    colors.set('black',[0, 0, 0])
    colors.set('yellow', [192, 192, 0])
    colors.set('orange', [255, 128, 0])
    colors.set('red', [255, 0, 0])
    colors.set-('blue', [0, 0, 255])

    const cell = (title, colors, editable) => {
        return {
            title, colors, editable            
        }
    }

    const gradient = [
        [
            cell('B / W', colors.get('light')),
            cell('0', colors.get('light')),
            cell('1', colors.get('light')),
            cell('2', colors.get('light')),
            cell('3+', colors.get('light'))
        ],

        [
            cell('0', colors.get('light')),
            cell('0/0', colors.get('green')),
            cell('0/1', [255, 255, 255]),
            cell('0/2', [255, 255, 255]),
            cell('0/3+', [255, 255, 255])
        ],
        [
            cell('1', colors.get('light')),
            cell('1/0', [0, 0, 0]),
            cell('1/1', colors.get('yellow')),
            cell('1/2', [128, 128, 128]),
            cell('1/3+', [128, 128, 128])
        ],
        [
            cell('2', colors.get('light')),
            cell('2/0', [0, 0, 0]),
            cell('2/1', [128, 128, 128]),
            cell('2/2', colors.get('orange')),
            cell('2/3+', [128, 128, 128]),        
        ],
        [
            cell('3+', colors.get('light')),
            cell('3+/0', colors.get('black')),
            cell('3+/1', [128, 128, 128]),
            cell('3+/2', [128, 128, 128]),
            cell('3+/3+', [128, 128, 128])
        ]
    ]
</script>

<table class="table">
    {#each gradient as row }
        <tr>
            {#each row as cell }
                <td style="background-color: rgb({ cell.colors});">
                    { cell.title }
                </td>
            {/each}       
        </tr>
    {/each}
</table>
