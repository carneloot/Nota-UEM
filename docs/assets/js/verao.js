function setInputs(){for(var a=1;a<=NUM_QUESTOES;a++)$('input.questao[name="qst-'+a+'"]').val(params["qst-"+a]);$('option[value="'+curso+'"]').attr("selected","selected").siblings().removeAttr("selected"),$('option[value="'+linguaEstrangeira+'"]').attr("selected","selected").siblings().removeAttr("selected"),$('option[value="'+ano+'"]').attr("selected","selected").siblings().removeAttr("selected"),$('input[name="redacao"]').val(redacao)}function setVariables(){for(var a=1;a<=NUM_QUESTOES;a++)questoesMarcadas.push(parseInt(params["qst-"+a],10));questoesCorretas=questoesCorretas.concat(_gabarito[ano]["conhecimentos-gerais"]),questoesCorretas=questoesCorretas.concat(_gabarito[ano]["portugues-literatura"]),questoesCorretas=questoesCorretas.concat(_gabarito[ano][linguaEstrangeira]),questoesCorretas=questoesCorretas.concat(_gabarito[ano][especificas[0]]),questoesCorretas=questoesCorretas.concat(_gabarito[ano][especificas[1]])}function calculaNota(){for(var a=[],t=0,s=0,e=0,o="",r=[],c=0;c<questoesMarcadas.length;c++){var i=getNota(questoesMarcadas[c],questoesCorretas[c]);a.push(i),t+=i,i>0&&e++}s=t+redacao;var u=_categorias[ano];r=[["Conhecimentos Gerais",u["conhecimentos-gerais"][0],u["conhecimentos-gerais"][1]],["Português e Literatura",u["portugues-literatura"][0],u["portugues-literatura"][1]],["Língua Estrangeira - "+pretty(linguaEstrangeira),u["lingua-estrangeira"][0],u["lingua-estrangeira"][1]],["Específica 1 - "+pretty(especificas[0]),u["especifica-1"][0],u["especifica-1"][1]],["Específica 2 - "+pretty(especificas[1]),u["especifica-2"][0],u["especifica-2"][1]]];for(c=0;c<r.length;c++){for(var p=0,l=6*(r[c][2]-r[c][1]+1),d=r[c][1];d<=r[c][2];d++)p+=a[d];p=p.toString().replace(".",","),r[c][0]+=0==p?"<span class='reprovado'>Reprovou</span>":p==l?"<span class='gabaritado'>Gabaritou (Total: "+p+")</span>":"<span class='nota'>Total: "+p+"</span>"}o+="<tbody>";for(var g,c=0;c<r.length;c++){o+='<tr><th colspan="5" scope="colgroup">'+r[c][0]+"</th></tr>",g=0;for(d=r[c][1];d<=r[c][2];d++)d!=r[c][1]&&d!=r[c][1]+5*g||(o+="<tr>",g++),-1==questoesCorretas[d]?o+='<td class="questao-anulada"><span>'+n(d+1)+"</span> </td>":o+="<td><span>"+n(d+1)+"</span> "+nota(a[d])+"</td>",d!=r[c][2]&&d!=r[c][1]+5*g-1||(o+="</tr>")}o+="</tbody>",o+="<tfoot>",o+='<tr><td colspan="5"></td></tr>',o+="<tr>",-1!=questoesCorretas.indexOf(-1)?o+='<td colspan="2" rowspan="2" class="anulada-aviso">*Questões anuladas valem 6 pontos.</td>':o+='<td colspan="2" rowspan="2"></td>',o+='<th colspan="2">Não Zeradas</th>',o+="<td>"+e+"</td>",o+="</tr>",o+="<tr>",o+='<th colspan="2">Zeradas</th>',o+="<td>"+(NUM_QUESTOES-e)+"</td>",o+="</tr>",o+="</tfoot>",$(".tabela-questoes").html(o),$(".notas-resumo .nota-total span").text(nota(s)+" / 360"),$(".notas-resumo .nota-objetivas span").text(nota(t)+" / 240"),$(".notas-resumo .nota-redacao span").text(nota(redacao)+" / 120"),$("section.notas").css("display","block")}function showTooltips(){$(".tooltip-wrap").children().first().on("focus",function(){$(".tooltip-wrap .tooltip").addClass("show")}),$(".tooltip-wrap").children().first().on("blur",function(){$(".tooltip-wrap .tooltip").removeClass("show")})}var questoesCorretas=[],questoesMarcadas=[],linguaEstrangeira,redacao,ano,curso,especificas,_gabarito,_especificas,_categorias,params,version=Math.floor(1e3*Math.random()+1);const NUM_QUESTOES=60;$(function(){$.getJSON("./../assets/js/gabVer.json?v="+version,function(a){_gabarito=a.gabarito,_especificas=a.especificas,_categorias=a.categorias,"true"==(params=getParams()).calcular&&(linguaEstrangeira=params["lingua-estrangeira"],redacao=Number(params.redacao),ano=params.ano,curso=params.curso,especificas=_especificas[curso],setInputs(),setVariables(),calculaNota()),showTooltips()})});